/* month / day / year : hours:minutes PM/AM */
/* mes / dia / año : horas:minutos PM/AM */
/* 12 /  01 / 0000 : 01:01 PM */
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
const intervalId = 0;
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
  const _0x149C4 = new Date();
  const _0x149B0 = DATE_TARGET - _0x149C4;
  const _0x149D8 = Math[time[6]](_0x149B0 / MS_DAY);
  const _0x149EC = Math[time[6]](
    (_0x149B0 % MS_DAY) / MS_HOUR
  );
  const _0x14A00 = Math[time[6]](
    (_0x149B0 % MS_HOUR) / MS_MINUTE
  );
  const _0x14A14 = Math[time[6]](
    (_0x149B0 % MS_MINUTE) / MS_SECOND
  );
  SPAN_DAYS[time[7]] = _0x149D8;
  SPAN_HOURS[time[7]] = _0x149EC;
  SPAN_MINUTES[time[7]] = _0x14A00;
  SPAN_SECONDS[time[7]] = _0x14A14;
}
updateCountdown();
setInterval(updateCountdown, MS_SECOND);
function ChangeBackground(url) {
  const bgImageElement = document.querySelector(".bg-img");
  bgImageElement.style.backgroundImage = "url('" + url + "')";
}
if (time <= 0) {
  clearInterval(intervalId);
  ChangeBackground("./img/kawai.gif");
}