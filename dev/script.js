  // Diccionario con textos por país
  const textosPorPais = {
    mx: {
      menuHome: "Inicio",
      menuDownloads: "Descargas",
      menuGames: "Juegos",
      countdownText: "Tiempo para Navidad:",
      daysText: "días",
      hoursText: "horas",
      minutesText: "minutos",
      secondsText: "segundos",
      footerInfo: "Información de la página",
    },
    ar: {
      menuHome: "Inicio",
      menuDownloads: "Descargas",
      menuGames: "Juegos",
      countdownText: "Tiempo para Navidad:",
      daysText: "días",
      hoursText: "horas",
      minutesText: "minutos",
      secondsText: "segundos",
      footerInfo: "Información de la página",
    },
    en: {
      menuHome: "Home",
      menuDownloads: "Downloads",
      menuGames: "Games",
      countdownText: "Christmas time in:",
      daysText: "days",
      hoursText: "hours",
      minutesText: "minutes",
      secondsText: "seconds",
      footerInfo: "Page Information",
    },
    pt: {
      menuHome: "Início",
      menuDownloads: "Downloads",
      menuGames: "Jogos",
      countdownText: "Tempo até o Natal:",
      daysText: "dias",
      hoursText: "horas",
      minutesText: "minutos",
      secondsText: "segundos",
      footerInfo: "Informações da página",
    },
    ja: {
      menuHome: "ホーム",
      menuDownloads: "ダウンロード",
      menuGames: "ゲーム",
      countdownText: "クリスマスまでの時間：",
      daysText: "日",
      hoursText: "時間",
      minutesText: "分",
      secondsText: "秒",
      footerInfo: "ページ情報",
    }
  };

  // Función para cambiar los textos segun país
  function cambiarTextos(pais) {
    const textos = textosPorPais[pais] || textosPorPais.en; // fallback en inglés
    document.querySelectorAll("[data-text]").forEach(el => {
      const clave = el.getAttribute("data-text");
      if (clave && textos[clave]) {
        el.textContent = textos[clave];
      }
    });
  }

  // Crear selector flotante para cambiar país
  const selectPais = document.createElement("select");
  selectPais.id = "selectPais";
  selectPais.style.cssText = "position: fixed; bottom: 10px; right: 10px; z-index: 9999; padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; background: white; color: black;";
  for (const pais in textosPorPais) {
    const option = document.createElement("option");
    option.value = pais;
    option.textContent = pais.toUpperCase();
    selectPais.appendChild(option);
  }
  document.body.appendChild(selectPais);

  // Al cambiar el país
  selectPais.addEventListener("change", e => {
    const pais = e.target.value;
    cambiarTextos(pais);
    localStorage.setItem("paisSeleccionado", pais);
  });

  // Al cargar la página, poner el país guardado o default a 'en'
  document.addEventListener("DOMContentLoaded", () => {
    const paisGuardado = localStorage.getItem("paisSeleccionado") || "en";
    selectPais.value = paisGuardado;
    cambiarTextos(paisGuardado);
  });