// 🌐 Base del sitio
const BASE = "/static";
const DEFAULT_ICON = `${BASE}/icons/icon-192x192.png`;

self.addEventListener("push", async event => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch (e) {
    console.warn("❌ Push JSON inválido:", e);
    return;
  }

  // 📤 Enviar a la página si está abierta
  const clientsList = await clients.matchAll({ includeUncontrolled: true });
  for (const client of clientsList) {
    client.postMessage({ tipo: "push-payload", payload });
  }

  const title = payload.title || "Notificación";
  const image = typeof payload.image === "string" ? payload.image : undefined;

  const options = {
    body: payload.body || "Tienes un nuevo mensaje.",
    icon: DEFAULT_ICON,
    badge: DEFAULT_ICON,
    requireInteraction: !!payload.requireInteraction,
    silent: !!payload.silent,
    data: {
      url: payload.url || "/"
    }
  };

  // Solo agregar si es válida
  if (image) options.image = image;

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