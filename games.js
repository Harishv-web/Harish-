/* ================================================================
   HARISH V — FREE ARCADE
   Everything in this file runs locally in the browser. Scores are
   stored only on the visitor's device with localStorage.
   ================================================================ */

(() => {
  'use strict';

  const DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };

  document.addEventListener('DOMContentLoaded', () => {
    initialiseBackButton();
    const input = createInputRouter();
    const snake = initialiseSnake(input);
    const maze = initialiseMazeChaser(input);

    input.register('snake', snake);
    input.register('maze', maze);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        snake.pauseForVisibility();
        maze.pauseForVisibility();
      }
    });
  });

  function initialiseBackButton() {
    const button = document.getElementById('backToGames');
    if (!button) return;

    button.addEventListener('click', () => {
      let cameFromFreeServices = false;
      try {
        cameFromFreeServices = document.referrer && new URL(document.referrer).origin === location.origin;
      } catch {
        cameFromFreeServices = false;
      }

      if (cameFromFreeServices && history.length > 1) history.back();
      else location.href = 'free-services.html';
    });
  }

  function createInputRouter() {
    const games = new Map();
    let activeGame = null;
    const keyDirections = {
      ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
      w: 'up', W: 'up', s: 'down', S: 'down', a: 'left', A: 'left', d: 'right', D: 'right'
    };

    document.addEventListener('keydown', (event) => {
      const direction = keyDirections[event.key];
      if (!direction || !activeGame) return;
      const game = games.get(activeGame);
      if (!game || !game.acceptsInput()) return;
      event.preventDefault();
      game.setDirection(direction);
    });

    document.querySelectorAll('[data-controls]').forEach((controlGroup) => {
      const gameId = controlGroup.dataset.controls;
      controlGroup.querySelectorAll('[data-direction]').forEach((button) => {
        button.addEventListener('pointerdown', (event) => {
          event.preventDefault();
          const game = games.get(gameId);
          if (!game) return;
          activeGame = gameId;
          game.setDirection(button.dataset.direction);
        });
      });
    });

    return {
      activate(gameId) { activeGame = gameId; },
      register(gameId, game) { games.set(gameId, game); }
    };
  }

  function getStoredScore(key) {
    try { return Math.max(0, Number(localStorage.getItem(key)) || 0); } catch { return 0; }
  }

  function storeScore(key, score) {
    try { localStorage.setItem(key, String(score)); } catch { /* Storage may be disabled. */ }
  }

  function createSoundController(button) {
    let enabled = false;
    let audioContext = null;

    const ensureContext = () => {
      if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioContext = new AudioContextClass();
      }
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      return audioContext;
    };

    button.addEventListener('click', () => {
      enabled = !enabled;
      if (enabled) ensureContext();
      button.textContent = `Sound: ${enabled ? 'On' : 'Off'}`;
      button.setAttribute('aria-pressed', String(enabled));
      if (enabled) tone(660, .06, 'sine', .04);
    });

    function tone(frequency, duration = .08, type = 'sine', volume = .035) {
      if (!enabled) return;
      const context = ensureContext();
      if (!context) return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      gain.gain.setValueAtTime(.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration + .02);
    }

    return { tone };
  }

  function setOverlay(overlay, title, copy, visible) {
    overlay.querySelector('strong').textContent = title;
    overlay.querySelector('span').textContent = copy;
    overlay.classList.toggle('is-hidden', !visible);
  }

  function roundedRect(context, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + safeRadius, y);
    context.arcTo(x + width, y, x + width, y + height, safeRadius);
    context.arcTo(x + width, y + height, x, y + height, safeRadius);
    context.arcTo(x, y + height, x, y, safeRadius);
    context.arcTo(x, y, x + width, y, safeRadius);
    context.closePath();
  }

  /* ============================== SNAKE ============================== */
  function initialiseSnake(input) {
    const canvas = document.getElementById('snakeCanvas');
    const context = canvas.getContext('2d');
    const scoreOutput = document.getElementById('snakeScore');
    const highScoreOutput = document.getElementById('snakeHighScore');
    const levelOutput = document.getElementById('snakeLevel');
    const status = document.getElementById('snakeStatus');
    const overlay = document.getElementById('snakeOverlay');
    const startButton = document.getElementById('snakeStart');
    const pauseButton = document.getElementById('snakePause');
    const restartButton = document.getElementById('snakeRestart');
    const sound = createSoundController(document.getElementById('snakeAudio'));
    const cells = 24;
    const cellSize = canvas.width / cells;
    const storageKey = 'harish-games-snake-high-score';
    let highScore = getStoredScore(storageKey);
    let state;

    function randomFreeCell() {
      const occupied = new Set(state.snake.map((part) => `${part.x},${part.y}`));
      if (state.food) occupied.add(`${state.food.x},${state.food.y}`);
      if (state.bonus) occupied.add(`${state.bonus.x},${state.bonus.y}`);
      const available = [];
      for (let y = 0; y < cells; y += 1) {
        for (let x = 0; x < cells; x += 1) {
          if (!occupied.has(`${x},${y}`)) available.push({ x, y });
        }
      }
      return available.length ? available[Math.floor(Math.random() * available.length)] : null;
    }

    function createState() {
      const initial = {
        snake: [{ x: 11, y: 12 }, { x: 10, y: 12 }, { x: 9, y: 12 }, { x: 8, y: 12 }],
        direction: 'right',
        nextDirection: 'right',
        food: null,
        bonus: null,
        score: 0,
        level: 1,
        collected: 0,
        running: false,
        paused: false,
        gameOver: false,
        accumulator: 0,
        lastFrame: 0,
        frameId: 0,
        particles: []
      };
      state = initial;
      state.food = randomFreeCell();
      return initial;
    }

    function updateOutputs() {
      scoreOutput.textContent = String(state.score);
      highScoreOutput.textContent = String(highScore);
      levelOutput.textContent = String(state.level);
    }

    function addParticles(cell, color, count = 12) {
      for (let index = 0; index < count; index += 1) {
        state.particles.push({
          x: (cell.x + .5) * cellSize,
          y: (cell.y + .5) * cellSize,
          dx: (Math.random() - .5) * 3.5,
          dy: (Math.random() - .5) * 3.5,
          life: 1,
          color
        });
      }
    }

    function updateParticles() {
      state.particles = state.particles.filter((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.dy += .035;
        particle.life -= .045;
        return particle.life > 0;
      });
    }

    function reset(startImmediately = false) {
      cancelAnimationFrame(state?.frameId);
      createState();
      highScore = getStoredScore(storageKey);
      startButton.textContent = 'Start Game';
      pauseButton.textContent = 'Pause';
      pauseButton.disabled = true;
      status.textContent = 'Collect purple cores and watch for cyan bonus orbs.';
      setOverlay(overlay, 'Ready to play?', 'Collect the purple core and avoid your trail.', true);
      updateOutputs();
      draw(performance.now());
      if (startImmediately) start();
    }

    function finishGame() {
      state.running = false;
      state.paused = false;
      state.gameOver = true;
      cancelAnimationFrame(state.frameId);
      sound.tone(150, .25, 'sawtooth', .07);
      status.textContent = `Run over — final score: ${state.score}.`;
      startButton.textContent = 'Play Again';
      pauseButton.disabled = true;
      setOverlay(overlay, 'Trail overload', `You reached ${state.score} points. Start again for another run.`, true);
      draw(performance.now());
    }

    function move() {
      state.direction = state.nextDirection;
      const vector = DIRECTIONS[state.direction];
      const head = state.snake[0];
      const next = { x: head.x + vector.x, y: head.y + vector.y };
      const willEatFood = state.food && next.x === state.food.x && next.y === state.food.y;
      const willEatBonus = state.bonus && next.x === state.bonus.x && next.y === state.bonus.y;
      const bodyToCheck = willEatFood || willEatBonus ? state.snake : state.snake.slice(0, -1);
      const hitTrail = bodyToCheck.some((part) => part.x === next.x && part.y === next.y);

      if (next.x < 0 || next.y < 0 || next.x >= cells || next.y >= cells || hitTrail) {
        finishGame();
        return;
      }

      state.snake.unshift(next);
      let grew = false;

      if (willEatFood) {
        state.score += 10;
        state.collected += 1;
        state.food = randomFreeCell();
        addParticles(next, '#a78bfa');
        sound.tone(530 + state.level * 20, .07, 'triangle');
        grew = true;
        if (state.collected % 4 === 0) {
          const cell = randomFreeCell();
          if (cell) state.bonus = { ...cell, expiresAt: performance.now() + 7000 };
        }
      }

      if (willEatBonus) {
        state.score += 30;
        state.bonus = null;
        addParticles(next, '#22d3ee', 20);
        sound.tone(880, .11, 'sine', .055);
        grew = true;
      }

      if (!grew) state.snake.pop();
      state.level = Math.min(10, 1 + Math.floor(state.score / 60));

      if (state.score > highScore) {
        highScore = state.score;
        storeScore(storageKey, highScore);
      }
      updateOutputs();
    }

    function loop(timestamp) {
      if (!state.running) return;
      const elapsed = Math.min(220, timestamp - state.lastFrame);
      state.lastFrame = timestamp;
      state.accumulator += elapsed;
      const stepDelay = Math.max(58, 148 - (state.level - 1) * 10);

      while (state.accumulator >= stepDelay && state.running) {
        state.accumulator -= stepDelay;
        move();
      }

      updateParticles();
      draw(timestamp);
      if (state.running) state.frameId = requestAnimationFrame(loop);
    }

    function start() {
      if (state.gameOver) reset(false);
      if (state.running) return;
      state.running = true;
      state.paused = false;
      state.lastFrame = performance.now();
      state.accumulator = 0;
      startButton.textContent = 'Playing';
      pauseButton.textContent = 'Pause';
      pauseButton.disabled = false;
      status.textContent = 'Snake is live. Bonus orbs disappear quickly!';
      setOverlay(overlay, '', '', false);
      input.activate('snake');
      canvas.focus({ preventScroll: true });
      state.frameId = requestAnimationFrame(loop);
    }

    function pause() {
      if (!state.running) return;
      state.running = false;
      state.paused = true;
      cancelAnimationFrame(state.frameId);
      startButton.textContent = 'Resume Game';
      pauseButton.textContent = 'Paused';
      pauseButton.disabled = true;
      status.textContent = 'Snake paused.';
      setOverlay(overlay, 'Paused', 'Press Resume Game when you are ready.', true);
      draw(performance.now());
    }

    function setDirection(direction) {
      if (!state.running || OPPOSITE[state.direction] === direction) return;
      state.nextDirection = direction;
    }

    function draw(timestamp) {
      const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      background.addColorStop(0, '#07041a');
      background.addColorStop(1, '#03131c');
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = 'rgba(196, 181, 253, .075)';
      context.lineWidth = 1;
      for (let line = 0; line <= cells; line += 1) {
        context.beginPath(); context.moveTo(line * cellSize, 0); context.lineTo(line * cellSize, canvas.height); context.stroke();
        context.beginPath(); context.moveTo(0, line * cellSize); context.lineTo(canvas.width, line * cellSize); context.stroke();
      }

      if (state.food) {
        const pulse = 1 + Math.sin(timestamp / 140) * .11;
        const centerX = (state.food.x + .5) * cellSize;
        const centerY = (state.food.y + .5) * cellSize;
        context.save();
        context.shadowColor = '#a855f7'; context.shadowBlur = 18;
        context.fillStyle = '#c084fc';
        context.beginPath(); context.arc(centerX, centerY, cellSize * .27 * pulse, 0, Math.PI * 2); context.fill();
        context.fillStyle = '#f5f3ff';
        context.beginPath(); context.arc(centerX - 3, centerY - 3, cellSize * .08, 0, Math.PI * 2); context.fill();
        context.restore();
      }

      if (state.bonus) {
        if (timestamp > state.bonus.expiresAt) state.bonus = null;
        else {
          const remaining = Math.max(0, state.bonus.expiresAt - timestamp);
          const blink = remaining < 1800 && Math.floor(remaining / 150) % 2 === 0;
          if (!blink) {
            const centerX = (state.bonus.x + .5) * cellSize;
            const centerY = (state.bonus.y + .5) * cellSize;
            context.save();
            context.translate(centerX, centerY); context.rotate(timestamp / 500);
            context.shadowColor = '#22d3ee'; context.shadowBlur = 20; context.fillStyle = '#67e8f9';
            context.beginPath();
            for (let point = 0; point < 8; point += 1) {
              const radius = point % 2 === 0 ? cellSize * .31 : cellSize * .14;
              const angle = point * Math.PI / 4;
              const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius;
              if (point === 0) context.moveTo(x, y); else context.lineTo(x, y);
            }
            context.closePath(); context.fill(); context.restore();
          }
        }
      }

      state.snake.slice().reverse().forEach((part, index) => {
        const isHead = index === state.snake.length - 1;
        const padding = isHead ? 2 : 3;
        const x = part.x * cellSize + padding;
        const y = part.y * cellSize + padding;
        const size = cellSize - padding * 2;
        const gradient = context.createLinearGradient(x, y, x + size, y + size);
        gradient.addColorStop(0, isHead ? '#d8b4fe' : '#8b5cf6');
        gradient.addColorStop(1, isHead ? '#22d3ee' : '#4f46e5');
        context.fillStyle = gradient;
        context.shadowColor = isHead ? '#22d3ee' : '#8b5cf6';
        context.shadowBlur = isHead ? 15 : 7;
        roundedRect(context, x, y, size, size, isHead ? 8 : 6);
        context.fill();
        context.shadowBlur = 0;
        if (isHead) {
          const vector = DIRECTIONS[state.direction];
          context.fillStyle = '#07121c';
          context.beginPath();
          context.arc((part.x + .5 + vector.x * .16) * cellSize, (part.y + .5 + vector.y * .16) * cellSize, 2.6, 0, Math.PI * 2);
          context.fill();
        }
      });

      state.particles.forEach((particle) => {
        context.globalAlpha = Math.max(0, particle.life);
        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, 3, 3);
      });
      context.globalAlpha = 1;
    }

    canvas.addEventListener('pointerdown', () => input.activate('snake'));
    canvas.addEventListener('focus', () => input.activate('snake'));
    startButton.addEventListener('click', start);
    pauseButton.addEventListener('click', pause);
    restartButton.addEventListener('click', () => reset(false));

    reset(false);

    return {
      acceptsInput: () => state.running,
      setDirection,
      pauseForVisibility: pause
    };
  }

  /* =========================== MAZE CHASER =========================== */
  function initialiseMazeChaser(input) {
    const canvas = document.getElementById('mazeCanvas');
    const context = canvas.getContext('2d');
    const scoreOutput = document.getElementById('mazeScore');
    const highScoreOutput = document.getElementById('mazeHighScore');
    const livesOutput = document.getElementById('mazeLives');
    const status = document.getElementById('mazeStatus');
    const overlay = document.getElementById('mazeOverlay');
    const startButton = document.getElementById('mazeStart');
    const pauseButton = document.getElementById('mazePause');
    const restartButton = document.getElementById('mazeRestart');
    const sound = createSoundController(document.getElementById('mazeAudio'));
    const storageKey = 'harish-games-maze-high-score';
    const template = [
      '###################',
      '#o....#.....#....o#',
      '#.###.#.###.#.###.#',
      '#.....#...#.#.....#',
      '###.#####.#.#####.#',
      '#...#.....#.....#.#',
      '#.#.#.###G###.#.#.#',
      '#.#...#.....#...#.#',
      '#.#####...#####...#',
      '#........P........#',
      '#.#####...#####...#',
      '#.#...#..G..#...#.#',
      '#.#.#.#######.#.#.#',
      '#...#.....#.....#.#',
      '#.#####.###.#####.#',
      '#.....#...#.#.....#',
      '#.###.#.###.#.###.#',
      '#o....#.....#....o#',
      '###################'
    ];
    const rows = template.length;
    const columns = template[0].length;
    const tile = canvas.width / columns;
    let highScore = getStoredScore(storageKey);
    let state;

    function mapKey(x, y) { return `${x},${y}`; }

    function buildState(previous = null) {
      const board = [];
      const dots = new Map();
      let playerSpawn = null;
      const ghostSpawns = [];

      template.forEach((line, y) => {
        const row = line.padEnd(columns, '#').slice(0, columns).split('');
        row.forEach((cell, x) => {
          if (cell === '.') dots.set(mapKey(x, y), 'dot');
          if (cell === 'o') dots.set(mapKey(x, y), 'power');
          if (cell === 'P') { playerSpawn = { x, y }; row[x] = ' '; }
          if (cell === 'G') { ghostSpawns.push({ x, y }); row[x] = ' '; }
        });
        board.push(row);
      });

      const colors = ['#fb7185', '#a78bfa', '#22d3ee', '#f59e0b'];
      return {
        board,
        dots,
        playerSpawn,
        player: { ...playerSpawn, direction: null, nextDirection: null },
        ghosts: ghostSpawns.map((spawn, index) => ({ ...spawn, spawnX: spawn.x, spawnY: spawn.y, direction: index % 2 ? 'left' : 'right', color: colors[index], reviveUntil: 0 })),
        score: previous?.score || 0,
        lives: previous?.lives ?? 3,
        level: previous?.level || 1,
        running: false,
        paused: false,
        gameOver: false,
        accumulator: 0,
        playerAccumulator: 0,
        ghostAccumulator: 0,
        lastFrame: 0,
        frameId: 0,
        frightenedUntil: 0,
        ghostReleaseUntil: 0,
        particles: []
      };
    }

    function updateOutputs() {
      scoreOutput.textContent = String(state.score);
      highScoreOutput.textContent = String(highScore);
      livesOutput.textContent = String(state.lives);
    }

    function isWalkable(x, y) {
      return y >= 0 && y < rows && x >= 0 && x < columns && state.board[y][x] !== '#';
    }

    function addParticles(x, y, color, count = 9) {
      for (let index = 0; index < count; index += 1) {
        state.particles.push({
          x: (x + .5) * tile,
          y: (y + .5) * tile,
          dx: (Math.random() - .5) * 2.6,
          dy: (Math.random() - .5) * 2.6,
          life: 1,
          color
        });
      }
    }

    function updateParticles() {
      state.particles = state.particles.filter((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.life -= .038;
        return particle.life > 0;
      });
    }

    function reset(startImmediately = false) {
      cancelAnimationFrame(state?.frameId);
      state = buildState();
      highScore = getStoredScore(storageKey);
      startButton.textContent = 'Start Game';
      pauseButton.textContent = 'Pause';
      pauseButton.disabled = true;
      status.textContent = 'Collect every spark and use power stars against sentinels.';
      setOverlay(overlay, 'Ready to chase?', 'Clear every spark and use power stars to turn the tide.', true);
      updateOutputs();
      draw(performance.now());
      if (startImmediately) start();
    }

    function resetPositions() {
      state.player = { ...state.playerSpawn, direction: null, nextDirection: null };
      state.ghosts.forEach((ghost, index) => {
        ghost.x = ghost.spawnX;
        ghost.y = ghost.spawnY;
        ghost.direction = index % 2 ? 'left' : 'right';
        ghost.reviveUntil = 0;
      });
    }

    function addScore(points) {
      state.score += points;
      if (state.score > highScore) {
        highScore = state.score;
        storeScore(storageKey, highScore);
      }
      updateOutputs();
    }

    function playerStep(timestamp) {
      const player = state.player;
      if (player.nextDirection) {
        const turn = DIRECTIONS[player.nextDirection];
        if (isWalkable(player.x + turn.x, player.y + turn.y)) player.direction = player.nextDirection;
      }
      if (!player.direction) return;

      const vector = DIRECTIONS[player.direction];
      const nextX = player.x + vector.x;
      const nextY = player.y + vector.y;
      if (!isWalkable(nextX, nextY)) return;
      player.x = nextX;
      player.y = nextY;

      const key = mapKey(player.x, player.y);
      const pickup = state.dots.get(key);
      if (pickup === 'dot') {
        state.dots.delete(key);
        addScore(10);
        sound.tone(420, .035, 'sine', .025);
      } else if (pickup === 'power') {
        state.dots.delete(key);
        state.frightenedUntil = timestamp + 6500;
        addScore(50);
        addParticles(player.x, player.y, '#a5f3fc', 16);
        sound.tone(760, .12, 'triangle', .055);
        status.textContent = 'Power star active — sentinels are vulnerable!';
      }

      if (state.dots.size === 0) {
        finishLevel();
        return;
      }
      checkCollision(timestamp);
    }

    function chooseGhostDirection(ghost, ghostIndex, timestamp) {
      const directions = Object.keys(DIRECTIONS).filter((direction) => {
        const vector = DIRECTIONS[direction];
        return isWalkable(ghost.x + vector.x, ghost.y + vector.y);
      });
      const nonReverse = directions.filter((direction) => direction !== OPPOSITE[ghost.direction]);
      const candidates = nonReverse.length ? nonReverse : directions;
      if (!candidates.length) return ghost.direction;
      const frightened = timestamp < state.frightenedUntil;
      const scored = candidates.map((direction) => {
        const vector = DIRECTIONS[direction];
        const distance = Math.abs(ghost.x + vector.x - state.player.x) + Math.abs(ghost.y + vector.y - state.player.y);
        return { direction, distance };
      }).sort((first, second) => frightened ? second.distance - first.distance : first.distance - second.distance);

      if (ghostIndex > 0 && Math.random() < .34) return candidates[Math.floor(Math.random() * candidates.length)];
      return scored[0].direction;
    }

    function ghostStep(timestamp) {
      // A short launch grace period keeps a new round fair: the player has
      // time to choose a direction before sentinels leave their stations.
      if (timestamp < state.ghostReleaseUntil) return;
      state.ghosts.forEach((ghost, index) => {
        if (timestamp < ghost.reviveUntil) return;
        ghost.direction = chooseGhostDirection(ghost, index, timestamp);
        const vector = DIRECTIONS[ghost.direction];
        if (vector && isWalkable(ghost.x + vector.x, ghost.y + vector.y)) {
          ghost.x += vector.x;
          ghost.y += vector.y;
        }
      });
      checkCollision(timestamp);
    }

    function checkCollision(timestamp) {
      const hit = state.ghosts.find((ghost) => ghost.x === state.player.x && ghost.y === state.player.y && timestamp >= ghost.reviveUntil);
      if (!hit) return;

      if (timestamp < state.frightenedUntil) {
        hit.x = hit.spawnX;
        hit.y = hit.spawnY;
        hit.reviveUntil = timestamp + 1000;
        addScore(200);
        addParticles(state.player.x, state.player.y, '#bbf7d0', 18);
        sound.tone(980, .13, 'square', .05);
        status.textContent = 'Sentinel sent home! +200 points.';
        return;
      }

      state.lives -= 1;
      updateOutputs();
      sound.tone(130, .24, 'sawtooth', .07);
      if (state.lives <= 0) {
        endGame();
        return;
      }

      state.running = false;
      state.paused = true;
      cancelAnimationFrame(state.frameId);
      resetPositions();
      startButton.textContent = 'Resume Game';
      pauseButton.disabled = true;
      status.textContent = `Sentinel collision — ${state.lives} ${state.lives === 1 ? 'life' : 'lives'} remaining.`;
      setOverlay(overlay, 'Sentinel collision', 'Press Resume Game to continue from the launch point.', true);
      draw(timestamp);
    }

    function finishLevel() {
      state.running = false;
      state.paused = true;
      cancelAnimationFrame(state.frameId);
      state.level += 1;
      addScore(250);
      state = buildState({ score: state.score, lives: state.lives, level: state.level });
      startButton.textContent = 'Next Level';
      pauseButton.disabled = true;
      status.textContent = `Maze cleared! Level ${state.level} is ready.`;
      sound.tone(1040, .18, 'triangle', .06);
      setOverlay(overlay, `Level ${state.level} unlocked`, 'The sentinels are moving faster. Press Next Level when ready.', true);
      updateOutputs();
      draw(performance.now());
    }

    function endGame() {
      state.running = false;
      state.paused = false;
      state.gameOver = true;
      cancelAnimationFrame(state.frameId);
      startButton.textContent = 'Play Again';
      pauseButton.disabled = true;
      status.textContent = `Arcade run complete — final score: ${state.score}.`;
      setOverlay(overlay, 'Maze run complete', `You scored ${state.score} points. Can you clear the maze next time?`, true);
      draw(performance.now());
    }

    function loop(timestamp) {
      if (!state.running) return;
      const elapsed = Math.min(220, timestamp - state.lastFrame);
      state.lastFrame = timestamp;
      state.playerAccumulator += elapsed;
      state.ghostAccumulator += elapsed;
      const playerDelay = Math.max(82, 124 - (state.level - 1) * 5);
      const ghostDelay = Math.max(86, 182 - (state.level - 1) * 9);

      while (state.playerAccumulator >= playerDelay && state.running) {
        state.playerAccumulator -= playerDelay;
        playerStep(timestamp);
      }
      while (state.ghostAccumulator >= ghostDelay && state.running) {
        state.ghostAccumulator -= ghostDelay;
        ghostStep(timestamp);
      }
      updateParticles();
      draw(timestamp);
      if (state.running) state.frameId = requestAnimationFrame(loop);
    }

    function start() {
      if (state.gameOver) reset(false);
      if (state.running) return;
      state.running = true;
      state.paused = false;
      state.lastFrame = performance.now();
      state.playerAccumulator = 0;
      state.ghostAccumulator = 0;
      state.ghostReleaseUntil = state.lastFrame + 1800;
      startButton.textContent = 'Playing';
      pauseButton.textContent = 'Pause';
      pauseButton.disabled = false;
      status.textContent = `Level ${state.level} active — collect every spark.`;
      setOverlay(overlay, '', '', false);
      input.activate('maze');
      canvas.focus({ preventScroll: true });
      state.frameId = requestAnimationFrame(loop);
    }

    function pause() {
      if (!state.running) return;
      state.running = false;
      state.paused = true;
      cancelAnimationFrame(state.frameId);
      startButton.textContent = 'Resume Game';
      pauseButton.textContent = 'Paused';
      pauseButton.disabled = true;
      status.textContent = 'Maze Chaser paused.';
      setOverlay(overlay, 'Paused', 'Press Resume Game when you are ready.', true);
      draw(performance.now());
    }

    function setDirection(direction) {
      if (!state.running) return;
      state.player.nextDirection = direction;
    }

    function draw(timestamp) {
      const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      background.addColorStop(0, '#060319');
      background.addColorStop(1, '#02181d');
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = 'rgba(139, 92, 246, .08)';
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          if (state.board[y][x] === '#') {
            const gradient = context.createLinearGradient(x * tile, y * tile, (x + 1) * tile, (y + 1) * tile);
            gradient.addColorStop(0, '#312e81');
            gradient.addColorStop(1, '#0e7490');
            context.fillStyle = gradient;
            context.shadowColor = 'rgba(34, 211, 238, .38)';
            context.shadowBlur = 7;
            roundedRect(context, x * tile + 2, y * tile + 2, tile - 4, tile - 4, 5);
            context.fill();
          }
        }
      }
      context.shadowBlur = 0;

      state.dots.forEach((kind, key) => {
        const [x, y] = key.split(',').map(Number);
        const centerX = (x + .5) * tile;
        const centerY = (y + .5) * tile;
        if (kind === 'power') {
          const pulse = 1 + Math.sin(timestamp / 130) * .18;
          context.save();
          context.translate(centerX, centerY); context.rotate(timestamp / 620);
          context.fillStyle = '#f0abfc'; context.shadowColor = '#f0abfc'; context.shadowBlur = 16;
          context.beginPath();
          for (let point = 0; point < 8; point += 1) {
            const radius = point % 2 === 0 ? 8 * pulse : 3.3 * pulse;
            const angle = point * Math.PI / 4;
            const px = Math.cos(angle) * radius; const py = Math.sin(angle) * radius;
            if (point === 0) context.moveTo(px, py); else context.lineTo(px, py);
          }
          context.closePath(); context.fill(); context.restore();
        } else {
          context.fillStyle = '#c4b5fd';
          context.beginPath(); context.arc(centerX, centerY, 2.35, 0, Math.PI * 2); context.fill();
        }
      });

      const frightened = timestamp < state.frightenedUntil;
      state.ghosts.forEach((ghost, index) => {
        if (timestamp < ghost.reviveUntil && Math.floor(timestamp / 110) % 2 === 0) return;
        const x = ghost.x * tile;
        const y = ghost.y * tile;
        const color = frightened ? '#60a5fa' : ghost.color;
        context.save();
        context.fillStyle = color;
        context.shadowColor = color;
        context.shadowBlur = frightened ? 18 : 10;
        context.beginPath();
        context.arc(x + tile / 2, y + tile * .46, tile * .31, Math.PI, 0);
        context.lineTo(x + tile * .81, y + tile * .78);
        context.lineTo(x + tile * .65, y + tile * .69);
        context.lineTo(x + tile * .5, y + tile * .8);
        context.lineTo(x + tile * .35, y + tile * .69);
        context.lineTo(x + tile * .19, y + tile * .78);
        context.closePath(); context.fill();
        context.shadowBlur = 0;
        context.fillStyle = '#f8fafc';
        context.beginPath(); context.arc(x + tile * .39, y + tile * .45, tile * .09, 0, Math.PI * 2); context.fill();
        context.beginPath(); context.arc(x + tile * .61, y + tile * .45, tile * .09, 0, Math.PI * 2); context.fill();
        context.fillStyle = frightened ? '#1e3a8a' : '#111827';
        const look = DIRECTIONS[ghost.direction] || DIRECTIONS.left;
        context.beginPath(); context.arc(x + tile * .39 + look.x * 2, y + tile * .45 + look.y * 2, tile * .04, 0, Math.PI * 2); context.fill();
        context.beginPath(); context.arc(x + tile * .61 + look.x * 2, y + tile * .45 + look.y * 2, tile * .04, 0, Math.PI * 2); context.fill();
        context.restore();
      });

      const player = state.player;
      const centerX = (player.x + .5) * tile;
      const centerY = (player.y + .5) * tile;
      const vector = DIRECTIONS[player.direction] || DIRECTIONS.right;
      context.save();
      context.translate(centerX, centerY);
      context.shadowColor = '#22d3ee'; context.shadowBlur = 20;
      const comet = context.createRadialGradient(-3, -3, 2, 0, 0, tile * .35);
      comet.addColorStop(0, '#ecfeff');
      comet.addColorStop(.35, '#67e8f9');
      comet.addColorStop(1, '#8b5cf6');
      context.fillStyle = comet;
      context.beginPath(); context.arc(0, 0, tile * .31, 0, Math.PI * 2); context.fill();
      context.shadowBlur = 0;
      context.fillStyle = '#07131c';
      context.beginPath(); context.arc(vector.x * 4, vector.y * 4, 2.4, 0, Math.PI * 2); context.fill();
      context.restore();

      state.particles.forEach((particle) => {
        context.globalAlpha = Math.max(0, particle.life);
        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, 3, 3);
      });
      context.globalAlpha = 1;
    }

    canvas.addEventListener('pointerdown', () => input.activate('maze'));
    canvas.addEventListener('focus', () => input.activate('maze'));
    startButton.addEventListener('click', start);
    pauseButton.addEventListener('click', pause);
    restartButton.addEventListener('click', () => reset(false));

    reset(false);

    return {
      acceptsInput: () => state.running,
      setDirection,
      pauseForVisibility: pause
    };
  }
})();
