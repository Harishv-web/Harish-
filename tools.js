/* ================================================================
   FREE SERVICES JAVASCRIPT
   Each feature is browser-only. No visitor text, timer or typing data
   is sent to Harish or any other server.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initialiseBackButton();
  initialiseConnectionStatus();
  initialiseToolShortcuts();
  initialiseSpeedTester();
  initialiseQrGenerator();
  initialiseTypingTest();
  initialiseStopwatch();
  initialiseTimer();
  initialiseCalendar();
});

/* ===================== RETURN TO THE SERVICES SECTION ===================== */
function initialiseBackButton() {
  const backButton = document.getElementById('backToServices');
  if (!backButton) return;
  backButton.addEventListener('click', () => {
    let cameFromThisWebsite = false;
    try { cameFromThisWebsite = document.referrer && new URL(document.referrer).origin === location.origin; } catch { cameFromThisWebsite = false; }
    if (cameFromThisWebsite && history.length > 1) history.back();
    else location.href = 'index.html#services';
  });
}

/* ========================== ONLINE / OFFLINE CHIP ========================= */
function initialiseConnectionStatus() {
  const chip = document.getElementById('connectionChip');
  if (!chip) return;
  const update = () => {
    const online = navigator.onLine;
    chip.classList.toggle('is-offline', !online);
    chip.innerHTML = `● <span>${window.getSiteText(online ? 'onlineReady' : 'offlineMode')}</span>`;
  };
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  window.addEventListener('site-language-changed', update);
  update();
}

/* ============================ PANEL SWITCHING ============================== */
function initialiseToolShortcuts() {
  const shortcuts = [...document.querySelectorAll('.tool-shortcut')];
  const panels = [...document.querySelectorAll('.tool-panel')];
  shortcuts.forEach((shortcut) => shortcut.addEventListener('click', () => {
    const panelId = shortcut.dataset.tool;
    shortcuts.forEach((item) => item.classList.toggle('active', item === shortcut));
    panels.forEach((panel) => panel.classList.toggle('active', panel.id === panelId));
    const activePanel = document.getElementById(panelId);
    activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => activePanel.focus({ preventScroll: true }), 400);
  }));
}

/* ========================== NETWORK SPEED TESTER =========================== */
function initialiseSpeedTester() {
  const start = document.getElementById('startSpeedTest');
  const retest = document.getElementById('retestSpeed');
  const canvas = document.getElementById('speedometer');
  if (!start || !retest || !canvas) return;
  const pingOutput = document.getElementById('pingValue');
  const downloadOutput = document.getElementById('downloadValue');
  const uploadOutput = document.getElementById('uploadValue');
  const status = document.getElementById('speedStatus');
  let currentSpeed = 0;

  const drawMeter = (speed) => {
    currentSpeed = Math.max(0, speed || 0);
    const context = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height, centerX = width / 2, centerY = height * .79, radius = width * .34;
    const maximum = Math.max(100, Math.ceil(currentSpeed / 50) * 50 + 50);
    context.clearRect(0, 0, width, height);
    context.lineCap = 'round';
    context.lineWidth = 31;
    context.strokeStyle = '#191925';
    context.beginPath(); context.arc(centerX, centerY, radius, Math.PI, Math.PI * 2); context.stroke();
    const valueAngle = Math.PI + Math.min(currentSpeed / maximum, 1) * Math.PI;
    const gradient = context.createLinearGradient(0, 0, width, 0); gradient.addColorStop(0, '#8b5cf6'); gradient.addColorStop(1, '#06b6d4');
    context.strokeStyle = gradient;
    context.beginPath(); context.arc(centerX, centerY, radius, Math.PI, valueAngle); context.stroke();
    context.strokeStyle = '#ffffff'; context.lineWidth = 7;
    const needleEndX = centerX + Math.cos(valueAngle) * (radius - 18);
    const needleEndY = centerY + Math.sin(valueAngle) * (radius - 18);
    context.beginPath(); context.moveTo(centerX, centerY); context.lineTo(needleEndX, needleEndY); context.stroke();
    context.fillStyle = '#ffffff'; context.beginPath(); context.arc(centerX, centerY, 11, 0, Math.PI * 2); context.fill();
    context.fillStyle = '#d8d5ff'; context.font = '700 52px Space Grotesk, sans-serif'; context.textAlign = 'center';
    context.fillText(`${currentSpeed.toFixed(1)} Mbps`, centerX, height * .33);
    context.fillStyle = '#9ca3af'; context.font = '24px Space Grotesk, sans-serif'; context.fillText(`scale: 0–${maximum} Mbps`, centerX, height * .43);
  };
  drawMeter(0);

  const setBusy = (busy) => { start.disabled = busy; retest.disabled = busy; start.style.opacity = busy ? '.6' : ''; retest.style.opacity = busy ? '.6' : ''; };
  const fetchTimed = async (url, options = {}) => {
    const started = performance.now();
    const response = await fetch(url, { cache: 'no-store', ...options });
    if (!response.ok && response.type !== 'opaque') throw new Error(`Test server returned ${response.status}`);
    await response.arrayBuffer();
    return performance.now() - started;
  };
  const randomBytes = (length) => {
    const data = new Uint8Array(length);
    for (let offset = 0; offset < length; offset += 65536) crypto.getRandomValues(data.subarray(offset, Math.min(offset + 65536, length)));
    return data;
  };
  const runTest = async () => {
    if (!navigator.onLine) { status.textContent = 'You are offline. Connect to the internet before running a speed test.'; status.className = 'status-note error'; return; }
    setBusy(true); status.className = 'status-note'; pingOutput.textContent = '…'; downloadOutput.textContent = '…'; uploadOutput.textContent = '…'; drawMeter(0);
    try {
      status.textContent = 'Measuring ping…';
      const pingMilliseconds = await fetchTimed(`https://speed.cloudflare.com/cdn-cgi/trace?cb=${Date.now()}`);
      pingOutput.textContent = `${Math.round(pingMilliseconds)} ms`;

      status.textContent = 'Measuring download speed…';
      const downloadBytes = 5_000_000;
      const downloadMilliseconds = await fetchTimed(`https://speed.cloudflare.com/__down?bytes=${downloadBytes}&cb=${Date.now()}`);
      const downloadMbps = (downloadBytes * 8) / downloadMilliseconds / 1000;
      downloadOutput.textContent = `${downloadMbps.toFixed(1)} Mbps`;
      drawMeter(downloadMbps);

      status.textContent = 'Measuring upload speed…';
      const uploadData = randomBytes(2_000_000);
      const uploadMilliseconds = await fetchTimed(`https://speed.cloudflare.com/__up?cb=${Date.now()}`, { method: 'POST', body: uploadData });
      const uploadMbps = (uploadData.byteLength * 8) / uploadMilliseconds / 1000;
      uploadOutput.textContent = `${uploadMbps.toFixed(1)} Mbps`;
      status.textContent = 'Test complete. These are browser-to-test-server estimates.'; status.className = 'status-note success';
    } catch (error) {
      status.textContent = `Speed test could not finish: ${error.message}. Please try again.`; status.className = 'status-note error';
    } finally { setBusy(false); }
  };
  start.addEventListener('click', runTest); retest.addEventListener('click', runTest);
}

/* ============================ QR CODE GENERATOR ============================ */
function initialiseQrGenerator() {
  const input = document.getElementById('qrText');
  const generate = document.getElementById('generateQr');
  const download = document.getElementById('downloadQr');
  const canvas = document.getElementById('qrCanvas');
  const status = document.getElementById('qrStatus');

  if (!input || !generate || !download || !canvas || !status) return;

  generate.addEventListener('click', () => {
    const text = input.value.trim();

    if (!text) {
      status.textContent = 'Please enter text or a link first.';
      status.className = 'status-note error';
      return;
    }

    if (typeof window.QRCode !== 'function') {
      status.textContent = 'QR generator is loading. Please refresh and try again.';
      status.className = 'status-note error';
      return;
    }

    status.textContent = 'Generating your QR code…';
    status.className = 'status-note';

    const temporaryBox = document.createElement('div');
    temporaryBox.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(temporaryBox);

    new window.QRCode(temporaryBox, {
      text: text,
      width: 320,
      height: 320,
      colorDark: '#020202',
      colorLight: '#ffffff',
      correctLevel: window.QRCode.CorrectLevel.M
    });

    const copyQrToCanvas = () => {
      const generatedQr = temporaryBox.querySelector('canvas, img');

      if (!generatedQr) {
        status.textContent = 'Could not create the QR code. Please try again.';
        status.className = 'status-note error';
        temporaryBox.remove();
        return;
      }

      if (generatedQr.tagName === 'IMG' && !generatedQr.complete) {
        generatedQr.addEventListener('load', copyQrToCanvas, { once: true });
        return;
      }

      const context = canvas.getContext('2d');
      canvas.width = 320;
      canvas.height = 320;
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 320, 320);
      context.imageSmoothingEnabled = false;
      context.drawImage(generatedQr, 0, 0, 320, 320);

      canvas.style.display = 'block';
      download.disabled = false;
      status.textContent = 'QR code is ready. You can download it now.';
      status.className = 'status-note success';
      temporaryBox.remove();
    };

    setTimeout(copyQrToCanvas, 150);
  });

  download.addEventListener('click', () => {
    if (download.disabled) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'harish-v-qr-code.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}

/* =========================== TYPING SPEED TEST ============================== */
function initialiseTypingTest() {
  const samples = {
    en: ['Technology grows when curiosity becomes practice. Small, consistent steps create skills that can solve real problems.', 'A good website is clear, fast, useful and welcoming on every screen. Careful work makes a simple idea feel professional.'],
    ta: ['தொழில்நுட்பம் பற்றிய ஆர்வம் பயிற்சியாக மாறும்போது திறன் வளர்கிறது. சிறிய தொடர்ச்சியான முயற்சிகள் உண்மையான பிரச்சினைகளைத் தீர்க்கும் திறனை உருவாக்கும்.'],
    hi: ['जब जिज्ञासा अभ्यास बनती है तब तकनीक के साथ कौशल बढ़ता है। छोटे और लगातार कदम वास्तविक समस्याओं को हल करने की क्षमता बनाते हैं।']
  };
  const start = document.getElementById('startTyping'); const reset = document.getElementById('resetTyping'); const input = document.getElementById('typingInput'); const sample = document.getElementById('typingSample');
  if (!start || !reset || !input || !sample) return;
  const durationPicker = document.getElementById('typingDuration'); const timeOutput = document.getElementById('typingTime'); const wpmOutput = document.getElementById('typingWpm'); const accuracyOutput = document.getElementById('typingAccuracy'); const errorsOutput = document.getElementById('typingErrors'); const status = document.getElementById('typingStatus');
  let sourceText = '', startedAt = 0, duration = 60, interval = null, running = false;
  const resetTest = () => {
    clearInterval(interval); running = false; sourceText = ''; input.value = ''; input.disabled = true; sample.textContent = 'Press “Start Typing Test” to begin.';
    timeOutput.textContent = `${durationPicker.value}s`; wpmOutput.textContent = '0'; accuracyOutput.textContent = '100%'; errorsOutput.textContent = '0'; status.className = 'status-note'; status.textContent = '';
  };
  const updateStats = () => {
    const elapsedSeconds = Math.min(duration, Math.max(.1, (Date.now() - startedAt) / 1000));
    const typed = input.value; let correctCharacters = 0;
    [...typed].forEach((character, index) => { if (character === sourceText[index]) correctCharacters += 1; });
    const errors = Math.max(0, typed.length - correctCharacters);
    const words = typed.trim() ? typed.trim().split(/\s+/).length : 0;
    const wpm = Math.round(words / (elapsedSeconds / 60)); const accuracy = typed.length ? Math.round((correctCharacters / typed.length) * 100) : 100;
    timeOutput.textContent = `${Math.max(0, Math.ceil(duration - elapsedSeconds))}s`; wpmOutput.textContent = String(wpm); accuracyOutput.textContent = `${accuracy}%`; errorsOutput.textContent = String(errors);
    if (elapsedSeconds >= duration || typed === sourceText) {
      clearInterval(interval); running = false; input.disabled = true; status.textContent = typed === sourceText ? 'Perfect passage completed!' : 'Time is up. Press Start Typing Test to try again.'; status.className = 'status-note success';
    }
  };
  start.addEventListener('click', () => {
    clearInterval(interval); duration = Number(durationPicker.value); const language = window.getSiteLanguage(); const choices = samples[language] || samples.en;
    sourceText = choices[Math.floor(Math.random() * choices.length)]; sample.textContent = sourceText; input.value = ''; input.disabled = false; input.focus(); startedAt = Date.now(); running = true;
    timeOutput.textContent = `${duration}s`; wpmOutput.textContent = '0'; accuracyOutput.textContent = '100%'; errorsOutput.textContent = '0'; status.textContent = 'Test in progress…'; status.className = 'status-note';
    interval = setInterval(updateStats, 250);
  });
  input.addEventListener('input', () => { if (running) updateStats(); });
  reset.addEventListener('click', resetTest);
  window.addEventListener('site-language-changed', () => { if (!running) resetTest(); });
}

/* =============================== STOPWATCH ================================= */
function initialiseStopwatch() {
  const display = document.getElementById('stopwatchDisplay'); const start = document.getElementById('startStopwatch'); const lap = document.getElementById('lapStopwatch'); const reset = document.getElementById('resetStopwatch'); const list = document.getElementById('lapList');
  if (!display || !start || !lap || !reset || !list) return;
  let elapsed = 0, startedAt = 0, interval = null, running = false, lapNumber = 0;
  const format = (milliseconds) => { const centiseconds = Math.floor(milliseconds / 10) % 100; const seconds = Math.floor(milliseconds / 1000) % 60; const minutes = Math.floor(milliseconds / 60000); return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`; };
  const update = () => { const value = running ? elapsed + performance.now() - startedAt : elapsed; display.textContent = format(value); };
  start.addEventListener('click', () => {
    if (running) { elapsed += performance.now() - startedAt; running = false; clearInterval(interval); start.textContent = window.getSiteText('start'); }
    else { startedAt = performance.now(); running = true; interval = setInterval(update, 30); start.textContent = window.getSiteText('pause'); }
    update();
  });
  lap.addEventListener('click', () => { if (!running) return; lapNumber += 1; const item = document.createElement('li'); item.textContent = `${window.getSiteText('lap')} ${lapNumber}: ${display.textContent}`; list.prepend(item); });
  reset.addEventListener('click', () => { elapsed = 0; running = false; lapNumber = 0; clearInterval(interval); list.replaceChildren(); start.textContent = window.getSiteText('start'); update(); });
  window.addEventListener('site-language-changed', () => { start.textContent = window.getSiteText(running ? 'pause' : 'start'); });
}

/* ================================ TIMER ==================================== */
function initialiseTimer() {
  const minutes = document.getElementById('timerMinutes'); const seconds = document.getElementById('timerSeconds'); const display = document.getElementById('timerDisplay'); const start = document.getElementById('startTimer'); const pause = document.getElementById('pauseTimer'); const reset = document.getElementById('resetTimer'); const permission = document.getElementById('notificationPermission'); const stopAlarmButton = document.getElementById('stopAlarm'); const status = document.getElementById('timerStatus');
  if (!minutes || !seconds || !display || !start || !pause || !reset || !permission || !stopAlarmButton || !status) return;
  let remainingSeconds = 300, deadline = 0, interval = null, running = false, audioContext = null, alarmInterval = null;
  const format = (total) => `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  const readInputs = () => Math.max(0, Math.min(999, Number(minutes.value) || 0)) * 60 + Math.max(0, Math.min(59, Number(seconds.value) || 0));
  const render = () => { display.textContent = format(remainingSeconds); };
  const stopAlarm = () => { clearInterval(alarmInterval); alarmInterval = null; if (audioContext) { audioContext.close().catch(() => {}); audioContext = null; } };
  const prepareAudio = () => { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); if (audioContext.state === 'suspended') audioContext.resume().catch(() => {}); };
  const playBeep = () => {
    if (!audioContext) return; const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
    oscillator.frequency.setValueAtTime(760, audioContext.currentTime); gain.gain.setValueAtTime(.0001, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.22, audioContext.currentTime + .03); gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .42);
    oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + .45);
  };
  const finish = () => {
    running = false; clearInterval(interval); remainingSeconds = 0; render(); start.textContent = window.getSiteText('start'); status.textContent = 'Time is complete! Alarm is playing.'; status.className = 'status-note success';
    prepareAudio(); playBeep(); alarmInterval = setInterval(playBeep, 850); if (navigator.vibrate) navigator.vibrate([300, 120, 300, 120, 500]);
    if ('Notification' in window && Notification.permission === 'granted') new Notification('Timer finished', { body: 'Your Harish V free-services timer is complete.', icon: 'icon.svg' });
  };
  const tick = () => { remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); render(); if (remainingSeconds <= 0) finish(); };
  start.addEventListener('click', () => {
    if (running) return; if (remainingSeconds <= 0) remainingSeconds = readInputs(); if (remainingSeconds <= 0) { status.textContent = 'Please set at least one second.'; status.className = 'status-note error'; return; }
    stopAlarm(); prepareAudio(); deadline = Date.now() + remainingSeconds * 1000; running = true; start.textContent = window.getSiteText('pause'); status.textContent = 'Timer is running.'; status.className = 'status-note'; interval = setInterval(tick, 250); tick();
  });
  pause.addEventListener('click', () => { if (!running) return; remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); running = false; clearInterval(interval); start.textContent = window.getSiteText('start'); status.textContent = 'Timer paused.'; render(); });
  reset.addEventListener('click', () => { running = false; clearInterval(interval); stopAlarm(); remainingSeconds = readInputs(); start.textContent = window.getSiteText('start'); status.textContent = ''; status.className = 'status-note'; render(); });
  permission.addEventListener('click', async () => { if (!('Notification' in window)) { status.textContent = 'Notifications are not supported by this browser.'; status.className = 'status-note error'; return; } const result = await Notification.requestPermission(); status.textContent = result === 'granted' ? 'Timer notifications are enabled.' : 'Notification permission was not granted.'; status.className = result === 'granted' ? 'status-note success' : 'status-note error'; });
  stopAlarmButton.addEventListener('click', () => { stopAlarm(); if (navigator.vibrate) navigator.vibrate(0); status.textContent = 'Alarm stopped.'; });
  [minutes, seconds].forEach((input) => input.addEventListener('change', () => { if (!running) { remainingSeconds = readInputs(); render(); } }));
  window.addEventListener('site-language-changed', () => { start.textContent = window.getSiteText(running ? 'pause' : 'start'); });
  render();
}

/* ============================== CALENDAR =================================== */
function initialiseCalendar() {
  const monthPicker = document.getElementById('calendarMonth'); const yearPicker = document.getElementById('calendarYear'); const title = document.getElementById('calendarTitleText'); const weekdays = document.getElementById('calendarWeekdays'); const grid = document.getElementById('calendarGrid'); const previous = document.getElementById('previousMonth'); const next = document.getElementById('nextMonth');
  if (!monthPicker || !yearPicker || !title || !weekdays || !grid || !previous || !next) return;
  let viewDate = new Date(); viewDate.setDate(1);
  const locale = () => ({ en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN' }[window.getSiteLanguage()] || 'en-IN');
  const ensureYear = (year) => { if (![...yearPicker.options].some((option) => Number(option.value) === year)) { const option = new Option(String(year), String(year)); yearPicker.add(option); [...yearPicker.options].sort((a, b) => Number(a.value) - Number(b.value)).forEach((option) => yearPicker.append(option)); } };
  const populatePickers = () => {
    monthPicker.replaceChildren();
    Array.from({ length: 12 }, (_, month) => new Date(2024, month, 1).toLocaleDateString(locale(), { month: 'long' })).forEach((name, month) => monthPicker.add(new Option(name, String(month))));
    if (!yearPicker.options.length) for (let year = 1900; year <= 2100; year += 1) yearPicker.add(new Option(String(year), String(year)));
    ensureYear(viewDate.getFullYear()); monthPicker.value = String(viewDate.getMonth()); yearPicker.value = String(viewDate.getFullYear());
  };
  const render = () => {
    populatePickers(); title.textContent = viewDate.toLocaleDateString(locale(), { month: 'long', year: 'numeric' }); weekdays.replaceChildren(); grid.replaceChildren();
    for (let day = 0; day < 7; day += 1) { const label = document.createElement('span'); label.textContent = new Date(2023, 0, day + 1).toLocaleDateString(locale(), { weekday: 'short' }); weekdays.append(label); }
    const year = viewDate.getFullYear(), month = viewDate.getMonth(), firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let empty = 0; empty < firstDay; empty += 1) { const blank = document.createElement('span'); blank.className = 'calendar-day empty'; grid.append(blank); }
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day += 1) {
      const cell = document.createElement('span'); cell.className = 'calendar-day'; cell.textContent = String(day);
      if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) cell.classList.add('today');
      if (month === 4 && day === 15) { cell.classList.add('birthday'); cell.title = "Harish V's birthday"; }
      grid.append(cell);
    }
  };
  previous.addEventListener('click', () => { viewDate.setMonth(viewDate.getMonth() - 1); render(); });
  next.addEventListener('click', () => { viewDate.setMonth(viewDate.getMonth() + 1); render(); });
  monthPicker.addEventListener('change', () => { viewDate.setMonth(Number(monthPicker.value)); render(); });
  yearPicker.addEventListener('change', () => { viewDate.setFullYear(Number(yearPicker.value)); render(); });
  window.addEventListener('site-language-changed', render); render();
}
