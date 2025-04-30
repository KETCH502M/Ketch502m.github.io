/* month / day / year : hours:minutes PM/AM */
var time = [
  "12/25/2024 12:00 AM",
  "span#days",
  "querySelector",
  "span#hours",
  "span#minutes",
  "span#seconds",
  "floor",
  "textContent",
];
const DATE_TARGET = new Date(time[0]);
const SPAN_DAYS = document[time[2]](time[1]);
const SPAN_HOURS = document[time[2]](time[3]);
const SPAN_MINUTES = document[time[2]](time[4]);
const SPAN_SECONDS = document[time[2]](time[5]);
const MS_SECOND = 1000;
const MS_MINUTE = MS_SECOND * 60;
const MS_HOUR = MS_MINUTE * 60;
const MS_DAY = MS_HOUR * 24;

function updateCountdown() {
  const currentDate = new Date();
  const remainingTime = DATE_TARGET - currentDate;

  if (remainingTime <= 0) {
    clearInterval(setInterval(updateCountdown, MS_SECOND));
    SPAN_DAYS.textContent = "0";
    SPAN_HOURS.textContent = "0";
    SPAN_MINUTES.textContent = "0";
    SPAN_SECONDS.textContent = "0";
    ChangeBackground("/static/es/kawai.gif");
    // Establecer la cookie indicando que el tiempo ha expirado
    setCookie("countdownExpired", "true");
    return; // Detiene la ejecución de la función
  }

  const days = Math.floor(remainingTime / MS_DAY);
  const hours = Math.floor((remainingTime % MS_DAY) / MS_HOUR);
  const minutes = Math.floor((remainingTime % MS_HOUR) / MS_MINUTE);
  const seconds = Math.floor((remainingTime % MS_MINUTE) / MS_SECOND);

  SPAN_DAYS.textContent = days;
  SPAN_HOURS.textContent = hours;
  SPAN_MINUTES.textContent = minutes;
  SPAN_SECONDS.textContent = seconds;

  // Guardar el tiempo restante en la cookie
  setCookie("countdownTime", remainingTime.toString());
}

updateCountdown();
const intervalId = setInterval(updateCountdown, MS_SECOND);

// Función para establecer una cookie
function setCookie(name, value) {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // Caduca en 7 días
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para obtener el valor de una cookie
function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Función para cambiar el fondo
function ChangeBackground(url) {
  const bgImageElement = document.querySelector(".bg-img");
  bgImageElement.style.backgroundImage = "url('" + url + "')";
}

// Verificar si el tiempo ha expirado al cargar la página
window.onload = function () {
  // Si la cookie no existe, establecerla en false por defecto
  if (!getCookie("countdownExpired")) {
    setCookie("countdownExpired", "false");
  }

  const expired = getCookie("countdownExpired");
  if (expired === "true") {
    ChangeBackground("/static/es/kawai.gif");
  } else {
    const remainingTime = parseInt(getCookie("countdownTime"));
    if (!isNaN(remainingTime) && remainingTime > 0) {
      setInterval(updateCountdown, MS_SECOND);
    }
  }
};
