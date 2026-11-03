let skyMarks = [];
let wheatMarks = [];

function setup() {
  createCanvas(800, 520);

  // Create fixed marks once, so they do not randomly flicker in draw().
  for (let i = 0; i < 1100; i++) {
    let x = random(0, width);
    let y = random(0, 255);
    let markLength = random(5, 26);
    let shade = random(-25, 25);
    skyMarks.push([x, y, markLength, shade]);
  }

  for (let i = 0; i < 2600; i++) {
    let x = random(0, width);
    let y = random(250, height);
    let markLength = random(6, 23);
    let shade = random(-34, 34);
    wheatMarks.push([x, y, markLength, shade]);
  }
}

function draw() {
  updateTimeMechanic();
  drawSky();
  drawSun();
  drawWheatfield();
  drawReaper();
}

function drawSky() {
  background(skyRed, skyGreen, skyBlue);
  noStroke();
  fill(skyRed + 25, skyGreen + 18, skyBlue - 4);
  rect(0, 165, width, 90);

  // Short horizontal and slanted strokes imitate layered paint.
  for (let i = 0; i < skyMarks.length; i++) {
    let m = skyMarks[i];
    stroke(skyRed + m[3], skyGreen + m[3] / 2, skyBlue + m[3] / 3);
    strokeWeight(2.7);
    line(m[0], m[1], m[0] + m[2], m[1] - m[2] / 5);
  }
}

function drawSun() {
  noStroke();
  fill(253, 213 - wheatDarkness / 3, 105 - wheatDarkness / 3);
  ellipse(sunX, sunY, 76, 76);

  // Short marks soften the edge of the sun.
  stroke(252, 224 - wheatDarkness / 4, 145);
  strokeWeight(3);
  for (let i = 0; i < 24; i++) {
    let x = sunX - 37 + i * 3;
    line(x, sunY - 31, x + 6, sunY - 24);
  }
}

function drawWheatfield() {
  noStroke();
  fill(205 - wheatDarkness, 148 - wheatDarkness / 2, 46);
  rect(0, 250, width, height - 250);

  // Narrow horizontal colour bands give the field some depth.
  fill(224 - wheatDarkness, 171 - wheatDarkness / 2, 62);
  rect(0, 280, width, 70);
  fill(186 - wheatDarkness, 122 - wheatDarkness / 2, 38);
  rect(0, 420, width, 100);

  for (let i = 0; i < wheatMarks.length; i++) {
    let m = wheatMarks[i];
    let warm = m[3];
    stroke(235 - wheatDarkness + warm, 181 - wheatDarkness / 2 + warm / 2, 62 + warm / 3);
    strokeWeight(2.5);
    // Brushstrokes grow more upright toward the viewer.
    line(m[0], m[1], m[0] + m[2] / 2, m[1] - m[2]);
  }

  // A few longer strokes make the foreground feel like standing wheat.
  stroke(117 - wheatDarkness / 2, 99 - wheatDarkness / 3, 38);
  strokeWeight(2);
  for (let i = 0; i < 90; i++) {
    let x = i * 9;
    line(x, 520, x + 10, 450);
  }
}

function drawReaper() {
  // Small distant figure: a visual reference to the source composition.
  // It is intentionally simple because this demo focuses on the time mechanic.
  stroke(43, 69, 93);
  strokeWeight(5);
  line(350, 275, 343, 315);
  line(343, 315, 332, 338);
  line(343, 315, 357, 338);
  line(349, 285, 372, 297);
  noStroke();
  fill(60, 67, 69);
  ellipse(351, 266, 16, 16);
  stroke(96, 78, 43);
  strokeWeight(2);
  line(372, 297, 398, 275);
}
