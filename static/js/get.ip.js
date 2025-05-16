      // Obtener la IP del cliente
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("ipCliente").textContent =
            "Your IP " +
            data.ip +
            " it is collected to prevent attacks. I'm sorry...";
        })
        .catch((error) => {
          console.error("Problem to get your IP:", error);
          document.getElementById("ipCliente").textContent =
            "You are a hacker, your ip is unknow.";
        });