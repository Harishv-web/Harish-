const CACHE_NAME = 'harish-v-v1';
const assets = [
  '/',
  '/index.html',
  '/profile.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
