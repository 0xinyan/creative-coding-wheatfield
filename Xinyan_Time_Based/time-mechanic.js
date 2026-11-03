

let sunX = 303;
let sunY = 38;
let skyShade = 0;
let landShade = 0;

function updateTime() {

  let seconds = frameCount / 60;

  if (seconds > 10) {
    seconds = 10;
  }

  sunX = map(seconds, 0, 10, 303, 386);
  sunY = map(seconds, 0, 10, 38, 132);
  skyShade = map(seconds, 0, 10, 0, 92);
  landShade = map(seconds, 0, 10, 0, 84);
}
