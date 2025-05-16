  document.addEventListener('DOMContentLoaded', () => {
    const dwappDiv = document.getElementById('dwapp');
    const installButton = document.getElementById('dw-1');

    // Verifica si está en modo standalone (ya instalada)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (isStandalone) {
      // Si ya está instalada, oculta completamente el div
      if (dwappDiv) dwappDiv.remove();
      return;
    }

    // Evento para mostrar el botón de instalación
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      const deferredPrompt = e;

      // Mostrar el botón y contenedor
      if (dwappDiv) dwappDiv.style.display = 'block';
      if (installButton) installButton.style.display = 'inline-block';

      installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('App instalada');
          } else {
            console.log('Instalación cancelada');
          }
          // Oculta el div después de la acción
          if (dwappDiv) dwappDiv.remove();
        });
      });
    });
  });
