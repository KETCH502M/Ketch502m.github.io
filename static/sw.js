// 🌐 Base del sitio
const BASE = "/static";
const DEFAULT_ICON = `${BASE}/icons/icon-192x192.png`; // Ícono y badge fijos

// 🔔 Notificaciones push
self.addEventListener("push", event => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch (e) {
    console.warn("Push JSON inválido:", e);
    return;
  }

  const title = payload.title || "Notificación";
  const options = {
    body: payload.body || "Tienes un nuevo mensaje.",
    icon: DEFAULT_ICON,                         // Ícono fijo
    badge: DEFAULT_ICON,                        // Badge fijo
    image: payload.image || undefined,          // Imagen opcional del payload
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
      return clients.openWindow(url);
    })
  );
});