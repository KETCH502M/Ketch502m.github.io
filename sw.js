const CACHE_NAME = 'healtpix-cache-all-v1';

// Instalación: creamos la caché vacía
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

// Activación: limpiamos versiones antiguas
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch: cache first para TODO
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }
        // Si no está en caché, vamos a red y lo cacheamos para la próxima
        return fetch(event.request)
          .then(response => {
            // Clonamos la respuesta para cache y entrega
            const respClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, respClone));
            return response;
          })
          .catch(() => {
            // Opcional: puedes devolver un fallback (offline.html, etc.)
            return caches.match('/offline.html');
          });
      })
  );
});