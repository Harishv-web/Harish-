/* ================================================================
   PWA SERVICE WORKER
   Caches this website after the first online visit, so the pages and
   browser-only tools keep working offline. Network speed tests still
   require an internet connection by their nature.
   ================================================================ */

const CACHE_NAME = 'harish-v-portfolio-v6';
const CORE_FILES = [
  './', './index.html', './free-services.html', './styles.css', './site.js',
  './tools.js', './games.html', './games.js', './manifest.webmanifest', './icon.svg', './profile.jpg'
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

/*
  Network-first keeps deployed pages, styles and scripts current. Cached files
  are used only when the visitor is offline, preventing an old app shell from
  being shown indefinitely after a deployment.
*/
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: 'reload' });
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      const cached = await caches.match(request);
      if (cached) return cached;

      /* On offline navigation, return the cached home page as a safe fallback. */
      if (request.mode === 'navigate') return (await caches.match('./index.html')) || (await caches.match('./'));
      return new Response('', { status: 503, statusText: 'Offline' });
    }
  })());
});
