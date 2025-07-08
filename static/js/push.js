async function pedirPermisoNotificaciones() {
  const toast = document.getElementById("toast");
  console.log("🎯 Verificando soporte para notificaciones");

  if (!("Notification" in window)) {
    console.log("🚫 Notificaciones no soportadas por el navegador");
    return;
  }

  console.log("🔒 Solicitando permiso...");
  const permiso = await Notification.requestPermission();
  console.log("🔑 Permiso otorgado:", permiso);

  if (permiso !== "granted") {
    console.log("❌ Permiso denegado por el usuario");
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
    const respuesta = await fetch("https://optionally-close-eel.ngrok-free.app/api/push", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(suscripcion)
    });

    if (respuesta.ok) {
      console.log("✅ Suscripción enviada correctamente");
      if (toast) {
        toast.classList.add("show");
        toast.innerText = "✅ Notificaciones activadas";
        setTimeout(() => toast.classList.remove("show"), 1500);
      }
    } else {
      console.warn("⚠️ Falló la suscripción, status:", respuesta.status);
      if (toast) {
        toast.classList.add("show");
        toast.innerText = "❌ Error al suscribir";
        setTimeout(() => toast.classList.remove("show"), 1500);
      }
    }

  } catch (err) {
    console.error("❌ Error durante suscripción o fetch:", err);
    if (toast) {
      toast.classList.add("show");
      toast.innerText = "❌ Error en el proceso";
      setTimeout(() => toast.classList.remove("show"), 1500);
    }
  }
}

function urlBase64ToUint8Array(base64) {
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  const base64Clean = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Clean);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

async function esperarControlDelServiceWorker() {
  await navigator.serviceWorker.ready;

  if (navigator.serviceWorker.controller) {
    console.log("🟢 SW ya está controlando");
    return;
  }

  console.warn("⌛ Esperando que el SW tome control del documento...");
  return new Promise(resolve => {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("✅ SW ahora controla la página");
      resolve();
    }, { once: true });
  });
}

// 🔁 Registro del Service Worker y activación segura
window.addEventListener("load", async () => {
  console.log("🚀 Página cargada, iniciando registro de Service Worker...");

  if (!("serviceWorker" in navigator)) {
    console.log("🚫 Este navegador no soporta Service Workers");
    return;
  }

  try {
    const reg = await navigator.serviceWorker.register("/static/sw.js?v=2", {
      scope: "/static/"
    });
    console.log("✅ SW registrado correctamente:", reg);

    await esperarControlDelServiceWorker();
    console.log("🔄 SW listo y controlando. Iniciando solicitud de notificación.");

    pedirPermisoNotificaciones();

  } catch (e) {
    console.error("❌ Error al registrar el Service Worker:", e);
  }
});