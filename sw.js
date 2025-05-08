const CACHE_NAME = 'healtpix-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/img/healtpix.jpg',
  // agrega aquí más recursos estáticos que quieras cachear
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});