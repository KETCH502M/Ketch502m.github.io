async function pedirPermisoNotificaciones() {
  if (!('Notification' in window)) {
    toast.innerText = "🚫 Navegador no soporta notificaciones";
    toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1500);
    return;
  }

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") {
    toast.innerText = "❌ Permiso de notificaciones denegado";
    toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1500);
    return;
  }
  try {
    const registro = await navigator.serviceWorker.ready;
    const suscripcion = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BJtsaR8hLQiAM7x3xt6X4QKxxy3bRhuP9XP5TxCVVHZWfUyuNRUfPnR4TplXckcX3abBz5zPDxbyp-Sii9jRXPA")
    });
const respuesta = await fetch("https://optionally-close-eel.ngrok-free.app/api/push/subscribe", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json"
  },
  body: JSON.stringify(suscripcion)
});

console.log("📤 Enviando suscripción:", suscripcion);

if (respuesta.ok) {
  console.log("✅ Suscripción enviada correctamente");
} else {
  console.warn("⚠️ Falló la suscripción, status:", respuesta.status);
  toast.innerText = "❌ Error interno al configurar";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}
    

  } catch (err) {
    console.error("❌ Error en el proceso de suscripción:", err);
  }
}

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const base64Clean = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64Clean);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
      console.log("✅ SW registrado correctamente");
      pedirPermisoNotificaciones();
    } catch (e) {
      console.error("❌ Error al registrar el SW:", e);
    }
  }
});