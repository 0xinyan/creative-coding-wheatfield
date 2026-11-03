let timeProgress = 0;
let sunX = 0;
let sunY = 0;
let skyRed = 0;
let skyGreen = 0;
let skyBlue = 0;
let wheatDarkness = 0;

function updateTimeMechanic() {
  let seconds = millis() / 1000;
  if (seconds > 10) {
    seconds = 10;
  }
  timeProgress = seconds;

  sunX = map(seconds, 0, 10, 555, 625);
  sunY = map(seconds, 0, 10, 90, 240);

  skyRed = map(seconds, 0, 10, 104, 190);
  skyGreen = map(seconds, 0, 10, 160, 112);
  skyBlue = map(seconds, 0, 10, 194, 103);
  wheatDarkness = map(seconds, 0, 10, 0, 65);
}
