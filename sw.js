// Service Worker for HealtPix PWA
const CACHE_NAME = 'healtpix-static-v1';

// Lista de recursos estáticos a cachear 
const STATIC_ASSETS = [ '/', '/index.html', '/offline.html', '/assets/css/styles.css', '/assets/js/script.js', '/assets/img/healtpix.jpg', '/assets/img/icons/icon-192x192.png', '/assets/img/icons/icon-512x512.png' ];

// Instalación: precacheo de los estáticos 
self.addEventListener('install', event => { event.waitUntil( caches.open(CACHE_NAME) .then(cache => cache.addAll(STATIC_ASSETS)) .then(() => self.skipWaiting()) ); });

// Activación: limpieza de caches antiguas si cambió CACHE_NAME 
self.addEventListener('activate', event => { event.waitUntil( caches.keys().then(keys => Promise.all( keys.filter(key => key !== CACHE_NAME) .map(key => caches.delete(key)) ) ).then(() => self.clients.claim()) ); });

// Fetch: cache-first para estáticos, network-only para tdo lo demás 
self.addEventListener('fetch', event => { const requestURL = new URL(event.request.url);

// Si es un recurso estático definido en la lista 
if (STATIC_ASSETS.includes(requestURL.pathname)) { event.respondWith( caches.match(event.request) .then(cached => cached || fetch(event.request)) ); } else { // Para cualquier otra petición (APIs, dinámicos), siempre red 
event.respondWith( fetch(event.request) .catch(() => caches.match('/offline.html')) ); } });

