navigator.serviceWorker.addEventListener("message", event => {
  if (event.data?.tipo === "push-payload") {
    console.log("📦 Payload recibido del SW:", event.data.payload);
  }
});
const btn = document.getElementById("draggable-btn");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // 🖱️ PC: arrastrar con mouse
  btn.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - btn.getBoundingClientRect().left;
    offsetY = e.clientY - btn.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      e.preventDefault();
      btn.style.left = e.clientX - offsetX + "px";
      btn.style.top = e.clientY - offsetY + "px";
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // 📱 Móvil: arrastrar con touch
  btn.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - btn.getBoundingClientRect().left;
    offsetY = touch.clientY - btn.getBoundingClientRect().top;
  });

  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      btn.style.left = touch.clientX - offsetX + "px";
      btn.style.top = touch.clientY - offsetY + "px";
      btn.style.bottom = "auto";
      btn.style.right = "auto";
    }
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });
  