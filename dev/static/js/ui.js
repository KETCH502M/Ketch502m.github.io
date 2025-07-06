function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

function validarPIN() {
  const pin = Array.from(inputs).map(i => i.value).join("");
  button.disabled = pin.length !== 4 || isBlocked();
}

inputs.forEach((input, idx) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/, "");
    if (input.value && idx < inputs.length - 1) inputs[idx + 1].focus();
    validarPIN();
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Backspace" && !input.value && idx > 0) inputs[idx - 1].focus();
  });
});

function isBlocked() {
  const until = parseInt(localStorage.getItem("retryUntil"), 10);
  return until && Date.now() < until;
}

function startCountdown() {
  const until = parseInt(localStorage.getItem("retryUntil"), 10);
  if (!until) return;
  button.disabled = true;
  inputs.forEach(input => input.disabled = true);
  clearInterval(retryInterval);
  retryInterval = setInterval(() => {
    const now = Date.now();
    const diff = until - now;
    if (diff <= 0) {
      clearInterval(retryInterval);
      localStorage.removeItem("retryUntil");
      localStorage.removeItem("remainingAttempts");
      statusDiv.textContent = "";
      button.disabled = false;
      inputs.forEach(input => {
        input.disabled = false;
        input.value = "";
      });
      inputs[0].focus();
      validarPIN();
      return;
    }
    const min = Math.floor(diff / 60000).toString().padStart(2, '0');
    const sec = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    statusDiv.textContent = `⏳ Espera ${min}:${sec} para volver a intentar...`;
  }, 500);
}
