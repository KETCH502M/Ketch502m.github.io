// Función para cambiar los textos según país
function cambiarTextos(pais) {
  const textos = langList[pais] || langList.es;

  document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.getAttribute("data-text");
    const translation = key && textos[key];
    if (translation) {
      el.textContent = translation;
    }
  });

  // Traducción de placeholders (descomenta si quieres activarlo)

  document.querySelectorAll("[data-placeholder]").forEach(el => {
    const key2 = el.getAttribute("data-placeholder");
    const translation2 = key2 && textos[key2];
    if (translation2) el.setAttribute("placeholder", translation2);
  });
  
}

// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  const paisGuardado = localStorage.getItem("paisSeleccionado") || "en";
  const selectPais = document.getElementById("selectPais");

  if (selectPais) {
    selectPais.value = paisGuardado;
    selectPais.addEventListener("change", e => {
      const pais = e.target.value;
      cambiarTextos(pais);
      localStorage.setItem("paisSeleccionado", pais);
    });
  }

  cambiarTextos(paisGuardado); // Ejecutar siempre, haya o no select
});