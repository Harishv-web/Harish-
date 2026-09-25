/* Original Solar System Explorer and open-data Earth map for Harish V. */
(() => {
  'use strict';

  const bodies = [
    { id: 'sun', name: 'Sun', type: 'STAR', orbit: 0, size: 13, color: '#fbbf24', glow: '#fb923c', angle: 0, speed: 0, text: 'The star at the centre of our Solar System.' },
    { id: 'mercury', name: 'Mercury', type: 'PLANET · FIRST FROM THE SUN', orbit: 4, size: 2.1, color: '#a8a29e', glow: '#e7e5e4', angle: .2, speed: 1.35, text: 'The smallest and fastest planet, closest to the Sun.' },
    { id: 'venus', name: 'Venus', type: 'PLANET · SECOND FROM THE SUN', orbit: 6.5, size: 3.2, color: '#e5b66b', glow: '#fde68a', angle: 1.9, speed: .95, text: 'A bright cloud-covered neighbouring world.' },
    { id: 'earth', name: 'Earth', type: 'PLANET · THIRD FROM THE SUN', orbit: 9.4, size: 3.8, color: '#1677d2', glow: '#67e8f9', angle: 4, speed: .75, text: 'Our blue home world. Select Earth to enter the interactive global map.', earth: true },
    { id: 'mars', name: 'Mars', type: 'PLANET · FOURTH FROM THE SUN', orbit: 12.3, size: 2.9, color: '#dc6548', glow: '#fb7185', angle: 5.6, speed: .61, text: 'The red planet, home to Olympus Mons and robotic explorers.' },
    { id: 'asteroid', name: 'Asteroid Belt', type: 'REGION · BETWEEN MARS AND JUPITER', orbit: 15.2, size: 1.8, color: '#94a3b8', glow: '#cbd5e1', angle: .8, speed: .41, text: 'A broad region of rocky objects represented as a navigable belt.' },
    { id: 'jupiter', name: 'Jupiter', type: 'PLANET · FIFTH FROM THE SUN', orbit: 18.2, size: 7.5, color: '#d6a276', glow: '#fed7aa', angle: 2.7, speed: .32, text: 'The largest planet, a gas giant with powerful storms and many moons.' },
    { id: 'saturn', name: 'Saturn', type: 'PLANET · SIXTH FROM THE SUN', orbit: 22.6, size: 6.4, color: '#dfc27d', glow: '#fde68a', angle: .65, speed: .25, text: 'A gas giant recognised by its spectacular ring system.', rings: true },
    { id: 'uranus', name: 'Uranus', type: 'PLANET · SEVENTH FROM THE SUN', orbit: 27, size: 4.7, color: '#74cfd2', glow: '#a5f3fc', angle: 4.8, speed: .19, text: 'An ice giant with a dramatic tilted rotation axis.' },
    { id: 'neptune', name: 'Neptune', type: 'PLANET · EIGHTH FROM THE SUN', orbit: 31.2, size: 4.6, color: '#3f74d4', glow: '#93c5fd', angle: 3.4, speed: .15, text: 'The outermost planet, an ice giant with fast dark-blue winds.' },
    { id: 'kuiper', name: 'Kuiper Belt', type: 'REGION · OUTER SOLAR SYSTEM', orbit: 36, size: 1.7, color: '#a78bfa', glow: '#c4b5fd', angle: 5.4, speed: .1, text: 'A distant icy region beyond Neptune, including dwarf-planet neighbourhoods.' }
  ];
  const locations = {
    world: [0, 18, 1.3], india: [78.9629, 20.5937, 3.6], chennai: [80.2707, 13.0827, 9.6],
    tokyo: [139.6917, 35.6895, 8.4], paris: [2.3522, 48.8566, 8.4],
    newyork: [-74.006, 40.7128, 8.2], sydney: [151.2093, -33.8688, 8.2]
  };

  function init() {
    const panel = document.getElementById('worldPanel');
    const canvas = document.getElementById('solarSystemCanvas');
    const solarButton = document.getElementById('solarModeButton');
    const earthButton = document.getElementById('earthModeButton');
    const solarStage = document.getElementById('solarSystemStage');
    const earthStage = document.getElementById('earthMapStage');
    const title = document.getElementById('worldSelectionTitle');
    const meta = document.getElementById('worldSelectionMeta');
    const copy = document.getElementById('worldSelectionCopy');
    const bodyButtons = document.getElementById('worldPlanetButtons');
    const enterEarth = document.getElementById('worldEnterEarth');
    const mapStatus = document.getElementById('worldMapStatus');
    if (!panel || !canvas || !solarButton || !earthButton || !solarStage || !earthStage || !title || !meta || !copy || !bodyButtons || !enterEarth || !mapStatus) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const state = { yaw: -.38, pitch: .58, zoom: 1, selected: 'earth', pointer: null, dragged: false, hits: [], map: null, mapReady: false, mapLoading: false, pendingLocation: null };
    const byId = new Map(bodies.map((body) => [body.id, body]));
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stars = Array.from({ length: 150 }, (_, i) => ({ x: ((i * 97) % 997) / 997, y: ((i * 53 + 137) % 991) / 991, r: .35 + ((i * 29) % 17) / 15, a: .18 + ((i * 11) % 60) / 100 }));

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const selected = () => byId.get(state.selected) || byId.get('earth');
    const setMapStatus = (message, kind) => { mapStatus.textContent = message; mapStatus.className = 'world-map-status' + (kind ? ' ' + kind : ''); };
    const updateDetails = () => {
      const body = selected();
      title.textContent = body.name;
      meta.textContent = body.type;
      copy.textContent = body.text;
      enterEarth.hidden = !body.earth;
      bodyButtons.querySelectorAll('button').forEach((button) => {
        const active = button.dataset.body === body.id;
        button.classList.toggle('is-selected', active);
        button.setAttribute('aria-pressed', String(active));
      });
    };
    const choose = (id) => { if (byId.has(id)) { state.selected = id; updateDetails(); } };
    bodies.forEach((body) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.body = body.id;
      button.textContent = body.name;
      button.setAttribute('aria-pressed', String(body.id === state.selected));
      button.addEventListener('click', () => choose(body.id));
      bodyButtons.append(button);
    });

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(box.width));
      const height = Math.max(1, Math.round(box.height));
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) { canvas.width = width * ratio; canvas.height = height * ratio; }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      return { width, height };
    };
    const project = (x, y, z, width, height, scale) => {
      const cx = Math.cos(state.yaw), sx = Math.sin(state.yaw);
      const rx = x * cx - z * sx, rz = x * sx + z * cx;
      const cy = Math.cos(state.pitch), sy = Math.sin(state.pitch);
      return { x: width / 2 + rx * scale, y: height / 2 + (y * cy - rz * sy) * scale, depth: y * sy + rz * cy };
    };
    const orbit = (radius, width, height, scale, color) => {
      context.beginPath();
      for (let step = 0; step <= 100; step += 1) {
        const angle = step / 100 * Math.PI * 2;
        const point = project(Math.cos(angle) * radius, 0, Math.sin(angle) * radius, width, height, scale);
        if (step) context.lineTo(point.x, point.y); else context.moveTo(point.x, point.y);
      }
      context.strokeStyle = color || 'rgba(148, 163, 184, .2)';
      context.lineWidth = 1;
      context.stroke();
    };
    const draw = (item) => {
      const body = item.body, point = item.point, radius = item.radius;
      if (body.rings) {
        context.save(); context.translate(point.x, point.y); context.rotate(-state.yaw * .35);
        context.strokeStyle = 'rgba(253, 230, 138, .82)'; context.lineWidth = Math.max(1, radius * .28);
        context.beginPath(); context.ellipse(0, 0, radius * 1.85, radius * .54, 0, 0, Math.PI * 2); context.stroke(); context.restore();
      }
      const gradient = context.createRadialGradient(point.x - radius * .36, point.y - radius * .4, radius * .12, point.x, point.y, radius * 1.15);
      gradient.addColorStop(0, '#ffffff'); gradient.addColorStop(.24, body.color); gradient.addColorStop(1, body.glow);
      context.save(); context.shadowColor = body.glow; context.shadowBlur = body.id === 'sun' ? radius * 2.8 : radius * 1.45;
      context.fillStyle = gradient; context.beginPath(); context.arc(point.x, point.y, radius, 0, Math.PI * 2); context.fill(); context.restore();
      if (body.id === 'earth') {
        context.fillStyle = 'rgba(209, 250, 229, .8)'; context.beginPath(); context.arc(point.x + radius * 1.7, point.y - radius * .8, Math.max(1.6, radius * .23), 0, Math.PI * 2); context.fill();
      }
      const active = body.id === state.selected;
      if (active) { context.strokeStyle = '#e0f2fe'; context.lineWidth = 1.5; context.beginPath(); context.arc(point.x, point.y, radius + 5, 0, Math.PI * 2); context.stroke(); }
      if (radius > 3 || active) {
        context.fillStyle = active ? '#f5f3ff' : 'rgba(226, 232, 240, .82)';
        context.font = (active ? '700 ' : '600 ') + (active ? '13px' : '11px') + ' Space Grotesk, sans-serif';
        context.textAlign = 'center'; context.fillText(body.name, point.x, point.y + radius + 16);
      }
    };
    const render = (timestamp) => {
      const size = resize(), width = size.width, height = size.height;
      const background = context.createRadialGradient(width * .5, height * .45, 4, width * .5, height * .5, Math.max(width, height) * .75);
      background.addColorStop(0, '#111f3a'); background.addColorStop(.4, '#070d1d'); background.addColorStop(1, '#02040a');
      context.fillStyle = background; context.fillRect(0, 0, width, height);
      stars.forEach((star) => { context.globalAlpha = star.a; context.fillStyle = '#dbeafe'; context.beginPath(); context.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2); context.fill(); });
      context.globalAlpha = 1;
      const scale = Math.min(width, height) / 78 * state.zoom;
      bodies.filter((body) => body.orbit).forEach((body) => orbit(body.orbit, width, height, scale, body.type.startsWith('REGION') ? 'rgba(167, 139, 250, .27)' : ''));
      const elapsed = reducedMotion ? 0 : timestamp / 1000;
      state.hits = bodies.map((body) => {
        const angle = body.orbit ? body.angle + elapsed * body.speed : 0;
        const point = body.orbit ? project(Math.cos(angle) * body.orbit, 0, Math.sin(angle) * body.orbit, width, height, scale) : project(0, 0, 0, width, height, scale);
        return { body, point, radius: body.id === 'sun' ? Math.max(13, scale * .82) : Math.max(body.type.startsWith('REGION') ? 2.1 : 2.6, body.size * (1 + point.depth / 105)) };
      }).sort((a, b) => a.point.depth - b.point.depth);
      state.hits.forEach(draw);
      requestAnimationFrame(render);
    };
    const changeZoom = (factor) => { state.zoom = clamp(state.zoom * factor, .62, 2.9); };
    const chooseAt = (event) => {
      const box = canvas.getBoundingClientRect(), x = event.clientX - box.left, y = event.clientY - box.top;
      const hit = [...state.hits].reverse().find((item) => Math.hypot(item.point.x - x, item.point.y - y) <= item.radius + 10);
      if (hit) choose(hit.body.id);
    };
    canvas.addEventListener('pointerdown', (event) => { state.pointer = { x: event.clientX, y: event.clientY }; state.dragged = false; canvas.setPointerCapture(event.pointerId); });
    canvas.addEventListener('pointermove', (event) => {
      if (!state.pointer) return;
      const x = event.clientX - state.pointer.x, y = event.clientY - state.pointer.y;
      if (Math.abs(x) + Math.abs(y) > 3) state.dragged = true;
      state.yaw += x * .009; state.pitch = clamp(state.pitch + y * .008, -.9, .95); state.pointer = { x: event.clientX, y: event.clientY };
    });
    canvas.addEventListener('pointerup', (event) => { if (!state.dragged) chooseAt(event); state.pointer = null; });
    canvas.addEventListener('pointercancel', () => { state.pointer = null; });
    canvas.addEventListener('wheel', (event) => { event.preventDefault(); changeZoom(event.deltaY < 0 ? 1.14 : .88); }, { passive: false });
    canvas.addEventListener('keydown', (event) => {
      const key = event.key;
      if (key === 'ArrowLeft') state.yaw -= .12;
      else if (key === 'ArrowRight') state.yaw += .12;
      else if (key === 'ArrowUp') state.pitch = clamp(state.pitch - .1, -.9, .95);
      else if (key === 'ArrowDown') state.pitch = clamp(state.pitch + .1, -.9, .95);
      else if (key === '+' || key === '=') changeZoom(1.14);
      else if (key === '-') changeZoom(.88);
      else return;
      event.preventDefault();
    });
    document.getElementById('worldZoomIn')?.addEventListener('click', () => changeZoom(1.18));
    document.getElementById('worldZoomOut')?.addEventListener('click', () => changeZoom(.85));
    document.getElementById('worldResetView')?.addEventListener('click', () => { state.yaw = -.38; state.pitch = .58; state.zoom = 1; });

    const fly = (name) => {
      const target = locations[name] || locations.world;
      if (!state.map || !state.mapReady) { state.pendingLocation = name; return; }
      state.map.flyTo({ center: [target[0], target[1]], zoom: target[2], essential: true, duration: reducedMotion ? 0 : 1100 });
    };
    const startMap = () => {
      if (state.map) { requestAnimationFrame(() => state.map.resize()); return; }
      if (!navigator.onLine) { setMapStatus('Earth Map needs an online connection. The Solar System remains available locally.', 'error'); return; }
      if (!window.maplibregl) { setMapStatus('The map library did not load. Check your connection or content blocker, then try again.', 'error'); return; }
      if (state.mapLoading) return;
      state.mapLoading = true; setMapStatus('Loading the open global map…');
      try {
        const map = new window.maplibregl.Map({ container: 'earthMap', style: 'https://tiles.openfreemap.org/styles/dark', center: [0, 18], zoom: 1.3, minZoom: .8, maxZoom: 18, maxPitch: 60, renderWorldCopies: false, attributionControl: true, fadeDuration: 0 });
        state.map = map;
        map.addControl(new window.maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
        if (window.maplibregl.GlobeControl) map.addControl(new window.maplibregl.GlobeControl(), 'top-right');
        if (window.maplibregl.FullscreenControl) map.addControl(new window.maplibregl.FullscreenControl(), 'top-right');
        if (window.maplibregl.GeolocateControl && 'geolocation' in navigator) map.addControl(new window.maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: false, showUserHeading: true }), 'top-right');
        map.on('load', () => {
          try { map.setProjection({ type: 'globe' }); } catch (_) {}
          state.mapReady = true; state.mapLoading = false; map.resize();
          setMapStatus('Ready. Drag to explore, scroll to zoom, and use the controls to change globe or map view.', 'success');
          if (state.pendingLocation) { const pending = state.pendingLocation; state.pendingLocation = null; fly(pending); }
        });
        map.on('error', (event) => {
          if (!state.mapReady && event.error) { state.mapLoading = false; setMapStatus('The world map could not load. Please check your connection and try again.', 'error'); }
        });
      } catch (error) {
        state.mapLoading = false; state.map = null; setMapStatus('The world map could not start in this browser. The Solar System is still ready to explore.', 'error'); console.error('World Explorer map failed:', error);
      }
    };
    const setMode = (earth) => {
      solarButton.classList.toggle('is-active', !earth); earthButton.classList.toggle('is-active', earth);
      solarButton.setAttribute('aria-selected', String(!earth)); earthButton.setAttribute('aria-selected', String(earth));
      solarStage.hidden = earth; earthStage.hidden = !earth;
      if (earth) { startMap(); history.replaceState(null, '', '#world-explorer'); }
    };
    solarButton.addEventListener('click', () => setMode(false));
    earthButton.addEventListener('click', () => setMode(true));
    enterEarth.addEventListener('click', () => setMode(true));
    document.querySelectorAll('[data-world-location]').forEach((button) => button.addEventListener('click', () => { fly(button.dataset.worldLocation); startMap(); }));
    updateDetails();
    requestAnimationFrame(render);
  }
  document.addEventListener('DOMContentLoaded', init);
})();
