function mostrarToast(mensaje, tipo = 'info') {
  // Crear un div para el toast
  const toast = document.createElement('div');
  toast.textContent = mensaje;

  // Estilo del toast según el tipo
  toast.style.backgroundColor = tipo === 'error' ? 'red' : 'black';
  toast.style.color = 'white';
  toast.style.padding = '10px';
  toast.style.borderRadius = '5px';
  toast.style.marginBottom = '10px';
  toast.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  toast.style.transition = 'opacity 0.5s ease-in-out';
  toast.style.opacity = 1;

  // Agregar el toast al contenedor
  const toastContainer = document.getElementById('toastContainer');
  toastContainer.appendChild(toast);

  // Desvanecer y eliminar el toast después de unos segundos
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  // Función para obtener la dirección IP pública del usuario
  async function getUserIP() {
    let attempts = 0;
    while (attempts < 2) {
      try {
        // Llamada a un servicio externo para obtener la IP pública del usuario
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) {
          throw new Error(`Error al obtener la IP: ${response.statusText}`);
        }
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error("Error al obtener la IP:", error);
        attempts++;
        // Esperar 1 segundo antes del próximo intento
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    throw new Error("No se pudo obtener la IP después de 2 intentos");
  }
  

  // Función para obtener el tipo de navegador y el sistema operativo del usuario
  function getBrowserAndOS() {
    const userAgent = navigator.userAgent;
    let browser = "Desconocido";
    let os = "Desconocido";

    // Detectar el navegador
    if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("Safari")) {
      browser = "Safari";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
      browser = "Internet Explorer";
    }

    // Detectar el sistema operativo
    if (userAgent.includes("Windows NT")) {
      os = "Windows";
    } else if (userAgent.includes("Macintosh")) {
      os = "macOS";
    } else if (userAgent.includes("Linux")) {
      os = "Linux";
    } else if (userAgent.includes("Android")) {
      os = "Android";
    } else if (userAgent.includes("like Mac OS X")) {
      os = "iOS";
    }

    return { browser, os };
  }

  // Función para enviar la IP, User-Agent, tipo de navegador y sistema operativo al servidor
  async function sendIPAndBrowserToServer(ip, userAgent, browser, os, token) {
    // URL del servidor
    const serverUrl = "https://driving-driving-possum.ngrok-free.app/api/v1-beta";

    try {
      // Realiza una solicitud POST con la IP, User-Agent, tipo de navegador y sistema operativo
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ip,
          userAgent,
          browser,
          os,
        }),
      });

      // Verifica si la respuesta es correcta
      if (response.ok) {
        const data = await response.json();
        console.log("Conexión establecida con éxito:", data);
        mostrarToast(data.message);
      } else {
        console.error("Error al enviar la conexión:", response.statusText);
        mostrarToast("Error de conexión:", 'error');
      }
    } catch (error) {
      console.error("Error al enviar la conexión:", error);
      mostrarToast("Error al establecer la conexión", 'error');
    }
  }

  // Función para ejecutar otros scripts después de que sendIPAndBrowserToServer termine
  function ejecutarAccionesAdicionales() {
    // Redirigir según el idioma
    redirigirSegunIdioma(); // Llama a la función que deseas ejecutar
  }

  // Obtener la IP pública del usuario y el User-Agent (información del navegador)
  getUserIP().then((ip) => {
    if (ip) {
      const userAgent = navigator.userAgent; // Obtener el User-Agent del navegador

      // Obtener el tipo de navegador y el sistema operativo
      const { browser, os } = getBrowserAndOS();
      const token = 'tOken123';

      console.log("Conectándose al servidor...");

      // Llamar a sendIPAndBrowserToServer con la IP, User-Agent, tipo de navegador y sistema operativo
      sendIPAndBrowserToServer(ip, userAgent, browser, os, token).then(() => {
        // Una vez que sendIPAndBrowserToServer termine, ejecutar otros scripts
        ejecutarAccionesAdicionales();
      }).catch(() => {
        console.error("Error al enviar la conexión al servidor");
        mostrarToast("Error al enviar la conexión al servidor", 'error');
      });
    } else {
      console.error("No se pudo obtener una conexión estable");
      mostrarToast("No se pudo obtener una conexión estable", 'error');
    }
  }).catch((error) => {
    console.error("Error al obtener la IP:", error);
    mostrarToast("Error al obtener la IP", 'error');
  });
});
