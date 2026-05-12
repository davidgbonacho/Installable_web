const CACHE_NAME = 'app-pwa-v1.10';
const PRECACHE = [
  '/Installable_web/',
  '/Installable_web/index.html',
  '/Installable_web/manifest.json',
  '/Installable_web/img/logo.svg',
  '/Installable_web/img/logo48.png',
  '/Installable_web/img/logo144.png',
  '/Installable_web/img/logo192.png',
  '/Installable_web/img/logo512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached ?? fetch(event.request))
  );
});
