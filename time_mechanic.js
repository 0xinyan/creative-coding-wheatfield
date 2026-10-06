let daySky;
let sunsetSky;

function setupTimeMechanic() {
  daySky = color(195, 220, 185);
  sunsetSky = color(240, 175, 110);
}

function drawTimeScene() {
  let sceneTime = millis();

  let timeProgress = map(
    sceneTime,
    0,
    10000,
    0,
    1
  );

  timeProgress = constrain(
    timeProgress,
    0,
    1
  );

  let skyColour = lerpColor(
    daySky,
    sunsetSky,
    timeProgress
  );

  background(skyColour);

  // Sun movement
  let sunX = map(
    timeProgress,
    0,
    1,
    180,
    650
  );

  let sunY = map(
    timeProgress,
    0,
    1,
    100,
    260
  );

  noStroke();
  fill(255, 220, 90);

  circle(
    sunX,
    sunY,
    100
  );

  // Mountains
  noStroke();

  fill(110, 150, 135);
  triangle(
    0, 360,
    200, 200,
    380, 360
  );

  fill(95, 145, 150);
  triangle(
    250, 360,
    500, 190,
    700, 360
  );

  fill(120, 155, 130);
  triangle(
    500, 360,
    720, 220,
    800, 360
  );

  // Wheat field background
noStroke();
let fieldBrightness = map(
  timeProgress,
  0,
  1,
  1,
  0.7
);

let fieldColour = color(
  235 * fieldBrightness,
  190 * fieldBrightness,
  45 * fieldBrightness
);

fill(fieldColour);

rect(
  0,
  350,
  width,
  250
);

// Wheat stalks
stroke(190, 140, 30);
strokeWeight(2);

for (let x = 10; x < width; x += 15) {

  let stalkHeight = 120 + (x % 60);

  line(
    x,
    600,
    x,
    600 - stalkHeight
  );
}
}