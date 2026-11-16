const CACHE_NAME = 'app-pwa-v1.10';
// Specify which items you would like to store in the cache 
// (which will be available when there is no internet connection).)
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

// add all these items to the CACHE
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Deletes caches from previous versions and takes control of open pages.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Upon launching the application, it requests cached files or accesses file loading 
// (if an internet connection is available).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached ?? fetch(event.request))
  );
});
