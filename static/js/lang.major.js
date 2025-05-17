  // Diccionario con textos por país
  const textosPorPais = {
    es: {
      titleText: "HP - Inicio",
      menuHome: "Inicio",
      menuDownloads: "Descargas",
      menuGames: "Juegos",
      countdownText: "Tiempo para Navidad:",
      daysTxt: "días",
      hoursText: "horas",
      minutesText: "minutos",
      secondsText: "segundos",
      textV2Web: "¡WEB V2 disponible!",
      textPwa: "¡Instala la version PWA!",
      footerInfo: "Información de la página",
      footerInfoCode: "Introduce un código de 6 dígitos",
      toastGood: "¡Muy bien!",
      toastBad: "Código incorrecto",
      toastLength: "El código debe tener exactamente 6 dígitos",
    },
    en: {
      titleText: "HP - Home",
      menuHome: "Home",
      menuDownloads: "Downloads",
      menuGames: "Games",
      countdownText: "Christmas time in:",
      daysText: "days",
      hoursText: "hours",
      minutesText: "minutes",
      secondsText: "seconds",
      footerInfo: "Page Information",
      textV2Web: "WEB V2 available",
      textPwa: "Install the PWA version!",
      footerInfoCode: "Enter a 6-digit code",
      toastGood: "Well done!",
      toastBad: "Incorrect code",
      toastLength: "The code must be exactly 6 digits",
    },
    pt: {
      titleText: "HP - Inicio",
      menuHome: "Início",
      menuDownloads: "Downloads",
      menuGames: "Jogos",
      countdownText: "Tempo até o Natal:",
      daysText: "dias",
      hoursText: "horas",
      minutesText: "minutos",
      secondsText: "segundos",
      footerInfo: "Informações da página",
      textV2Web: "WEB V2 disponível!",
      textPwa: "Instale a versão PWA!",
      footerInfoCode: "Digite um código de 6 dígitos",
      toastGood: "Muito bem!",
      toastBad: "Código incorreto",
      toastLength: "O código deve ter exatamente 6 dígitos",
    },
    ja: {
      titleText: "HP - Home",
      menuHome: "ホーム",
      menuDownloads: "ダウンロード",
      menuGames: "ゲーム",
      countdownText: "クリスマスまでの時間：",
      daysText: "日",
      hoursText: "時間",
      minutesText: "分",
      secondsText: "秒",
      textV2Web:"WEB V2が利用可能です！",
      textPwa: "PWAバージョンをインストールしよう！",
      footerInfo: "ページ情報",
      footerInfoCode: "6桁のコードを入力してください",
      toastGood: "よくできました！",
      toastBad: "無効なコードです",
      toastLength: "コードは6桁でなければなりません",
    },
  };

  // Diccionario de rutas por clave y por idioma
  const rutasPorIdioma = {
    menuHome: {
      es: "/",
      en: "/",
      pt: "/",
      ja: "/",
    },
    menuDownloads: {
      es: "./downloads",
      en: "./downloads",
      pt: "./downloads",
      ja: "./downloads",
    },
    menuGames: {
      es: "./games",
      en: "./games",
      pt: "./games",
      ja: "./games",
    },
  };

  // Función para cambiar los textos según pais
  function cambiarTextos(pais) {
    const textos = textosPorPais[pais] || textosPorPais.es; // fallback en inglés
    document.querySelectorAll("[data-text]").forEach(el => {
      const clave = el.getAttribute("data-text");
      if (clave && textos[clave]) {
        el.textContent = textos[clave];
      }
    });
  }

  // Función para redirigir usando el data-text y el idioma seleccionado
  function redirigirDespuesDeRetraso(elemento) {
    const clave = elemento.querySelector(".text").getAttribute("data-text");
    const idioma = localStorage.getItem("paisSeleccionado") || "en";

    if (rutasPorIdioma[clave] && rutasPorIdioma[clave][idioma]) {
      setTimeout(() => {
        window.location.href = rutasPorIdioma[clave][idioma];
      }, 1000); // 1s de retraso
    } else {
      console.error(`No hay ruta definida para "${clave}" en "${idioma}"`);
    }
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