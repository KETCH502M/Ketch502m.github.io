document
  .getElementById("codeInput")
  .addEventListener("input", function (event) {
    var code = event.target.value;
    var formattedCode = code
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})/, "$1-$2");
    event.target.value = formattedCode;
  });

document
  .getElementById("codeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const toast = document.getElementById("toast");
    const idioma = localStorage.getItem("paisSeleccionado") || "en";
    const textos = textosPorPais[idioma] || textosPorPais.en;

    const code = document.getElementById("codeInput").value.replace(/\D/g, "");

    const codes = {
      202412: "/game/pacman",
      111111: "/",
      101010: "activador",
      202403: "juegos",
      202034: "afinador",
    };

    if (code.length === 6) {
      if (codes[code]) {
        toast.innerText = textos.toastGood || "¡Muy bien!";
        toast.classList.add("show");

        new Audio("/assets/audio/success.mp3").play();

        setTimeout(() => toast.classList.remove("show"), 2000);
        setTimeout(() => (window.location.href = codes[code]), 2000);
      } else {
        toast.innerText = textos.toastBad || "Código incorrecto";
        toast.classList.add("show");

        new Audio("/assets/audio/error.mp3").play();
        setTimeout(() => toast.classList.remove("show"), 2500);
      }
    } else {
      toast.innerText = textos.toastLength || "El código debe tener exactamente 6 dígitos";
      toast.classList.add("show");

      new Audio("/assets/audio/error2.mp3").play();
      setTimeout(() => toast.classList.remove("show"), 2500);
    }
  });