// 🌐 Base del sitio
const BASE = "/static";

// 🔔 Notificaciones push
self.addEventListener("push", event => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch (e) {
    console.warn("📦 Push recibido pero el JSON es inválido:", e);
    return;
  }

  const title = payload.title || "Notificación";
  const options = {
    body: payload.body || "Tienes un nuevo mensaje.",
    icon: payload.icon || `${BASE}/icons/icon-192x192.png`,
    badge: `${BASE}/icons/icon-192x192.png`,
    image: payload.image || undefined,
    requireInteraction: payload.requireInteraction || false,
    silent: payload.silent || false,
    data: {
      url: payload.url || "/"
    }
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