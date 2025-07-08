function mostrarToast(mensaje, tipo = 'info') {
  const toast = document.createElement('div');
  toast.textContent = mensaje;

  toast.style.position = 'relative';
  toast.style.backgroundColor = tipo === 'error' ? 'red' : (tipo === 'success' ? 'green' : 'black');
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.marginBottom = '10px';
  toast.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
  toast.style.opacity = 0;
  toast.style.transform = 'translateX(100%)';
  toast.style.transition = 'all 1s ease';

  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = 1;
    toast.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  async function getUserIP() {
    let attempts = 0;
    while (attempts < 2) {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok)
          throw new Error(`001x1err: IP service responded with ${response.statusText}`);
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error("001x2err: Error al obtener la IP:", error);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    throw new Error("001x3err: No se pudo obtener la IP después de 2 intentos");
  }

  function getBrowserAndOS() {
    const userAgent = navigator.userAgent;
    let browser = "Desconocido";
    let os = "Desconocido";

    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) browser = "Internet Explorer";

    if (userAgent.includes("Windows NT")) os = "Windows";
    else if (userAgent.includes("Macintosh")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("like Mac OS X")) os = "iOS";

    return { browser, os };
  }

  function getOrGenerateUUID() {
    let uuid = localStorage.getItem("deviceUUID");
    if (!uuid) {
      uuid = crypto.randomUUID();
      localStorage.setItem("deviceUUID", uuid);
    }
    return uuid;
  }

  async function sendIPAndBrowserToServer(ip, userAgent, browser, os, uuid) {
    const serverUrl = "https://api-test-mve5.onrender.com/api/v1-beta";
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-UUID": `${uuid}`,
        },
        body: JSON.stringify({ ip, userAgent, browser, os}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Conexión establecida con éxito:", data);
        mostrarToast(data.message || "Conexión establecida", "success");
        redirigirSegunIdioma();
      } else {
        console.error("002x2err: Error HTTP en la conexión:", response.statusText);
        mostrarToast("002x2err: Error de conexión", 'error');
        redirigirSegunIdioma();
      }
    } catch (error) {
      console.error("002x1err: Error de red:", error);
      mostrarToast("002x1err", 'error');
      redirigirSegunIdioma();
    }
  }

  getUserIP().then((ip) => {
    if (ip) {
      const userAgent = navigator.userAgent;
      const { browser, os } = getBrowserAndOS();
      const uuid = getOrGenerateUUID();

      sendIPAndBrowserToServer(ip, userAgent, browser, os, uuid);
    } else {
      console.error("001x4err: IP no válida");
      mostrarToast("001x4err: IP inválida", 'error');
    }
  }).catch((error) => {
    console.error("001x5err: Error global:", error);
    mostrarToast("001x5err", 'error');
  });
});