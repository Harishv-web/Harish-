/* ================================================================
   PWA SERVICE WORKER
   Caches this website after the first online visit, so the pages and
   browser-only tools keep working offline. Network speed tests still
   require an internet connection by their nature.
   ================================================================ */

const CACHE_NAME = 'harish-v-portfolio-v1';
const CORE_FILES = [
  './', './index.html', './free-services.html', './styles.css', './site.js',
  './tools.js', './manifest.webmanifest', './icon.svg', './profile.jpg'
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
    await self.skipWaiting();
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
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok || response.type === 'opaque') {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      /* On offline navigation, return the cached home page as a safe fallback. */
      if (event.request.mode === 'navigate') return (await caches.match('./index.html')) || (await caches.match('./'));
      return new Response('', { status: 503, statusText: 'Offline' });
    }
  })());
});
