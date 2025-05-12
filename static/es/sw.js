// This is the "Offline page" service worker

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const CACHE = "pwabuilder-page";
const offlineFallbackPage = "offline.html";

// Archivos que deseas precachear (agrega aquí más archivos como imágenes, estilos, etc.)
const resourcesToCache = [
    "/static/es/",
    "static/es/index.html",
    "/static/es/css/styles.css", // Si tienes un archivo de estilos
    "/script.js", // Si tienes un archivo de JavaScript
    "/icons/icon-192x192.png", // Asegúrate de que estos iconos existan
    "/icons/icon-512x512.png", // Asegúrate de que estos iconos existan
    offlineFallbackPage
];

self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("install", async event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(resourcesToCache))
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener("fetch", event => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResp = await event.preloadResponse;

                    if (preloadResp) {
                        return preloadResp;
                    }

                    const networkResp = await fetch(event.request);
                    return networkResp;
                } catch (error) {
                    // Si la red no está disponible, responde con la página offline desde el cache
                    const cache = await caches.open(CACHE);
                    const cachedResp = await cache.match(offlineFallbackPage);
                    return cachedResp;
                }
            })()
        );
    } else {
        // Caché para otros recursos (ejemplo: imágenes, scripts, etc.)
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
