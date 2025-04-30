function DownloadFromUrl(fileURL, fileName) {
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }  

  var textosCambiantes = [
    "¡Vale!",
    "¡Ultima version!",
    "Una pequeña lista de versiones.",
    "Selecciona tu version favorita."
];

function ChangeTxt() {
    var spanCambiante = document.getElementById("random");
    var textoActual = spanCambiante.innerText;
    var indiceSiguiente = (textosCambiantes.indexOf(textoActual) + 1) % textosCambiantes.length;
    spanCambiante.innerText = textosCambiantes[indiceSiguiente];
}

setInterval(ChangeTxt, 5000);