async function pedirPermisoNotificaciones() {
  const toast = document.getElementById("toast");
  console.log("🎯 Verificando soporte para notificaciones");

  if (!('Notification' in window)) {
    console.log("🚫 No soportado por el navegador");
    return;
  }

  console.log("🔒 Solicitando permiso...");
  const permiso = await Notification.requestPermission();
  console.log("🔑 Permiso otorgado:", permiso);

  if (permiso !== "granted") {
    console.log("❌ Permiso denegado");
    return;
  }

  try {
    console.log("⚙️ Esperando Service Worker listo...");
    const registro = await navigator.serviceWorker.ready;

    console.log("📨 Subscribiendo a PushManager...");
    const suscripcion = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BJtsaR8hLQiAM7x3xt6X4QKxxy3bRhuP9XP5TxCVVHZWfUyuNRUfPnR4TplXckcX3abBz5zPDxbyp-Sii9jRXPA")
    });

    console.log("📤 Enviando suscripción al servidor...");
    const respuesta = await fetch("https://optionally-close-eel.ngrok-free.app/api/push/subscribe", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(suscripcion)
    });

    if (respuesta.ok) {
      console.log("✅ Suscripción enviada correctamente");
    } else {
      console.warn("⚠️ Falló la suscripción, status:", respuesta.status);
    }

  } catch (err) {
    console.error("❌ Error general:", err);
  }
}

function urlBase64ToUint8Array(base64) {
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  const base64Clean = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Clean);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

window.addEventListener("load", async () => {
  console.log("🚀 Página cargada, iniciando SW...");
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("sw.js");
      console.log("✅ SW registrado correctamente");
      pedirPermisoNotificaciones();
    } catch (e) {
      console.error("❌ Error al registrar SW:", e);
    }
  } else {
    console.log("🚫 Service Worker no soportado");
  }
});