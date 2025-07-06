    async function cancelarSuscripcion() {
      const toast = document.getElementById("toast");

      if (!("serviceWorker" in navigator)) {
        toast.innerText = "❌ Navegador no soporta Service Workers";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
        return;
      }

      try {
        const registro = await navigator.serviceWorker.ready;
        const subscripcion = await registro.pushManager.getSubscription();

        if (subscripcion) {
          const endpoint = subscripcion.endpoint;
          await subscripcion.unsubscribe();

          await fetch("https://optionally-close-eel.ngrok-free.app/api/push/unsubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ endpoint })
          });

          toast.innerText = "🔕 Suscripción cancelada";
        } else {
          toast.innerText = "No hay suscripción activa";
        }

        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);

      } catch (err) {
        console.error("❌ Error al cancelar suscripción:", err);
        toast.innerText = "Error inesperado al cancelar";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }
    }