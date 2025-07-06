async function loadProtectedPanel() {
  const token = sessionStorage.getItem("authToken");
  if (!token) return;
  statusDiv.textContent = "🔐 Verificando acceso...";
  try {
    const res = await fetch(`${SERVER_URL}/panel`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });
    if (res.ok) {
      const html = await res.text();
      document.open();
      document.write(html);
      document.close();
    } else {
      statusDiv.textContent = "Ocurrió un error, vuelve a ingresar el PIN.";
    }
  } catch {
    statusDiv.textContent = "No se pudo cargar el panel.";
  }
}

window.onload = async () => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    try {
      const res = await fetch(`${SERVER_URL}/api/validate-token`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        }
      });
      if (res.ok) {
        loadProtectedPanel();
        return;
      }
    } catch (err) {
      console.error("Error al validar el token:", err);
    }
    sessionStorage.removeItem("authToken");
  }

  inputs[0].focus();
  if (isBlocked()) {
    startCountdown();
  } else {
    await consultarIntentos();
  }
};