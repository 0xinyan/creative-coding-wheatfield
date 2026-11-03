
let painting;
let sunImage;

function preload() {
  painting = loadImage('assets/wheatfield_background.jpg');
  sunImage = loadImage('assets/original_sun.png');
}

function setup() {
  createCanvas(800, 632);
}

function draw() {
  image(painting, 0, 0, 800, 632);

  updateTime();

  image(sunImage, sunX - 44, sunY - 44, 88, 88);
  noStroke();
  fill(197, 103, 70, skyShade);
  rect(0, 0, 800, 248);

  fill(91, 65, 80, landShade);
  rect(0, 248, 800, 384);
}
