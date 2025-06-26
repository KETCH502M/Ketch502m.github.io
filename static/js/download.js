/*function DownloadFromUrl(fileURL, fileName) {
    var link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }  

  var textosCambiantes = [
    "¡1.21.80 disponible!",
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

setInterval(ChangeTxt, 5000);*/

const textosCambiantesPorIdioma = {
  en: [
    "1.21.80 is now available!",
    "Latest version!",
    "A small list of versions.",
    "Pick your favorite version."
  ],
  es: [
    "¡1.21.80 disponible!",
    "¡Última versión!",
    "Una pequeña lista de versiones.",
    "Selecciona tu versión favorita."
  ],
  pt: [
    "1.21.80 disponível!",
    "Última versão!",
    "Uma pequena lista de versões.",
    "Escolha sua versão favorita."
  ],
  ja: [
    "1.21.80が利用可能！",
    "最新バージョン！",
    "バージョンの小さなリスト。",
    "お気に入りのバージョンを選んでください。"
  ]
};

const idioma = localStorage.getItem("paisSeleccionado") || "en";
let textosCambiantes = textosCambiantesPorIdioma[idioma] || textosCambiantesPorIdioma["en"];

let indiceActual = 0;

function ChangeTxt() {
  const spanCambiante = document.getElementById("random");
  if (spanCambiante) {
    spanCambiante.innerText = textosCambiantes[indiceActual];
    indiceActual = (indiceActual + 1) % textosCambiantes.length;
  }
}

ChangeTxt(); // Muestra el primero al cargar
setInterval(ChangeTxt, 4000); // Cambia cada 5 segundos