/* ================================================================
   PWA SERVICE WORKER
   Caches this website after the first online visit, so the pages and
   browser-only tools keep working offline. Network speed tests still
   require an internet connection by their nature.
   ================================================================ */

const CACHE_NAME = 'harish-v-portfolio-v11';
const EXTERNAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];
const CORE_FILES = [
  './', './index.html', './free-services.html', './identity/', './identity/index.html', './styles.css', './site.js',
  './tools.js', './games.html', './games.js', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './icon.jpeg', './profile.jpg', './og-image.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    /* A missing optional photo/logo must not prevent the whole PWA installing. */
    await Promise.all(CORE_FILES.map(async (file) => {
      try {
        const response = await fetch(file, { cache: 'reload' });
        if (response.ok) await cache.put(file, response);
      } catch { /* The next online visit can cache this file. */ }
    }));
    await Promise.all(EXTERNAL_ASSETS.map(async (asset) => {
      try {
        const response = await fetch(asset, { cache: 'reload', mode: 'no-cors' });
        await cache.put(asset, response);
      } catch { /* The tool can still load when the visitor is online. */ }
    }));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!['http:', 'https:'].includes(url.protocol)) return;
  const isExternalAsset = EXTERNAL_ASSETS.includes(request.url);
  if (url.origin !== self.location.origin && !isExternalAsset) return;

  if (isExternalAsset) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request, { mode: 'no-cors' });
        if (!response.ok && response.type !== 'opaque') throw new Error('External asset unavailable');
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
        return response;
      } catch {
        return new Response('', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }
  const isNavigation = request.mode === 'navigate';
  const isStaticAsset = ['style', 'script', 'image', 'font'].includes(request.destination);

  event.respondWith((async () => {
    if (isStaticAsset) {
      const cached = await caches.match(request);
      if (cached) return cached;
    }

    try {
      const response = await fetch(request, { cache: isNavigation ? 'no-cache' : 'default' });
      if (response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      const cached = await caches.match(request);
      if (cached) return cached;

      /* On offline navigation, return the cached home page as a safe fallback. */
      if (isNavigation) return (await caches.match('./index.html')) || (await caches.match('./'));
      return new Response('', { status: 503, statusText: 'Offline' });
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
