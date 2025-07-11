async function pedirPermisoNotificaciones() {
  const toast = document.getElementById("toast");

  if (!("Notification" in window)) return;

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") return;

  try {
    const registro = await navigator.serviceWorker.ready;

    const suscripcion = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BJtsaR8hLQiAM7x3xt6X4QKxxy3bRhuP9XP5TxCVVHZWfUyuNRUfPnR4TplXckcX3abBz5zPDxbyp-Sii9jRXPA")
    });

    const respuesta = await fetch("https://api.healtpix.com/api/push/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(suscripcion)
    });

    if (respuesta.ok) {
      if (toast) {
        toast.classList.add("show");
        toast.innerText = "✅ Notificaciones activadas";
        setTimeout(() => toast.classList.remove("show"), 1500);
      }
    } else {
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

  if (navigator.serviceWorker.controller) return;

  return new Promise(resolve => {
    navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true });
  });
}

window.addEventListener("load", async () => {
  if (!("serviceWorker" in navigator)) return;

  try {
    const reg = await navigator.serviceWorker.register("/static/sw.js", {
      scope: "/static/"
    });
    pedirPermisoNotificaciones();
    await esperarControlDelServiceWorker();
    

  } catch (e) {
    console.error("❌ Error al registrar el Service Worker:", e);
  }
});

window.addEventListener("load", () => {
  const popup = document.getElementById("popupNoti");
  const btnYes = document.getElementById("btnNotifyYes");
  const btnNo = document.getElementById("btnNotifyNo");

  // Mostrar solo si el navegador lo permite, no está concedido y no fue rechazado manualmente
  if (
    "Notification" in window &&
    Notification.permission === "default" &&
    !localStorage.getItem("notiRechazada")
  ) {
    setTimeout(() => {
      popup.style.display = "flex";
    }, 1000); // espera 1.5 segundos antes de mostrar
  }

  btnYes?.addEventListener("click", () => {
    popup.style.display = "none";
    pedirPermisoNotificaciones(); // función ya existente
  });

  btnNo?.addEventListener("click", () => {
    popup.style.display = "none";
    localStorage.setItem("notiRechazada", "1");
  });
});

navigator.serviceWorker.addEventListener("message", event => {
  if (event.data?.tipo === "push-payload") {
    console.log("📦 Push Payload recibido del SW:", event.data.payload);
  }
});