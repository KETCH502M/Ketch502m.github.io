// sw.js – Offline + Push Notifications

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

const CACHE = "pwabuilder-page";
const offlineFallbackPage = "/static/offline.html";

const resourcesToCache = [
  offlineFallbackPage,
  "/static/css/",
  "/static/js/",
  "/static/icons/icon-192x192.png",
  "/static/icons/icon-512x512.png",
];

// 🧠 Control inmediato del nuevo SW
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(resourcesToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// 🧭 Modo offline
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;
          if (preloadResp) return preloadResp;

          return await fetch(event.request);
        } catch (error) {
          const cache = await caches.open(CACHE);
          const fallback = await cache.match(offlineFallbackPage);
          return fallback || Response.error();
        }
      })()
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});

// 🔔 Push Notifications
self.addEventListener("push", event => {
  if (!event.data) return;

  const payload = event.data.json();

  const title = payload.title || "Notificación";
  const options = {
    body: payload.body || "Tienes un nuevo mensaje.",
    icon: "/static/icons/icon-192x192.png",
    badge: "/static/icons/icon-192x192.png",
    image: payload.image || undefined,
    data: payload.url ? { url: payload.url } : {}
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 👉 Click en la notificación
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});