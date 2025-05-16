// Función para cambiar los textos según país
  function cambiarTextos(pais) {
    const textos = langList[pais] || langList.en; // fallback en inglés
   /* document.querySelectorAll("[data-text]").forEach(el => {
      const clave = el.getAttribute("data-text");
      if (clave && textos[clave]) {
        el.textContent = textos[clave];
      }
    });*/
    
    
      document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.getAttribute("data-text");
    const translation = key && textos[key];
    if (translation) {
      el.textContent = translation;
    }
  });
    // Traducción de placeholders
  document.querySelectorAll("[data-placeholder]").forEach(el => {
    const key = el.getAttribute("data-placeholder");
    const translation = key && textos[key];
    if (translation) el.setAttribute("placeholder", translation);
  });
  
}
  
    // Espera a que el DOM cargue
  document.addEventListener("DOMContentLoaded", () => {
    const selectPais = document.getElementById("selectPais");
    const paisGuardado = localStorage.getItem("paisSeleccionado") || "en";
    selectPais.value = paisGuardado;
    cambiarTextos(paisGuardado);

    selectPais.addEventListener("change", e => {
      const pais = e.target.value;
      cambiarTextos(pais);
      localStorage.setItem("paisSeleccionado", pais);
    });
  });