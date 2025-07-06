async function consultarIntentos() {
  try {
    const res = await fetch(`${SERVER_URL}/api/v1/login-attempts`, {
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    const data = await res.json();
    if (data.retryAfter > 0) {
      const until = Date.now() + (data.retryAfter * 1000);
      localStorage.setItem("retryUntil", until);
      startCountdown();
    } else {
      localStorage.setItem("remainingAttempts", data.remaining);
      statusDiv.textContent = `Intentos restantes: ${data.remaining}`;
    }
  } catch {
    console.warn("No se pudieron obtener los intentos restantes");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (isBlocked()) return;
  const pin = Array.from(inputs).map(i => i.value).join("");
  try {
    const res = await fetch(`${SERVER_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ password: pin })
    });
    const data = await res.json();
    if (res.ok && data.success && data.token) {
      sessionStorage.setItem("authToken", data.token);
      localStorage.removeItem("remainingAttempts");
      loadProtectedPanel();
    } else {
      const mensaje = data.message || "PIN incorrecto.";
      statusDiv.textContent = mensaje;
      if (res.status === 429 && data.retryAfter) {
        const blockUntil = Date.now() + (data.retryAfter * 1000);
        localStorage.setItem("retryUntil", blockUntil.toString());
        startCountdown();
      } else {
        localStorage.setItem("remainingAttempts", data.remaining);
        statusDiv.textContent = `${mensaje} Intentos restantes: ${Math.max(data.remaining, 0)}`;
        const container = document.querySelector("#pin-container");
        container.classList.add("shake");
        setTimeout(() => container.classList.remove("shake"), 1000);
        inputs.forEach(input => input.value = "");
        inputs[0].focus();
        validarPIN();
      }
    }
  } catch {
    statusDiv.textContent = "No se pudo conectar con el servidor. Entre 13-21h";
    inputs.forEach(input => input.disabled = true);
    button.disabled = true;
    setTimeout(() => {
      inputs.forEach(input => {
        input.disabled = false;
        input.value = "";
      });
      button.disabled = false;
      validarPIN();
    }, 5000);
  }
});
