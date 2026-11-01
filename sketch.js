// Shared sketch.js — standalone test of the Wheat class + mouse interaction.
// Teammates can later add their own Time / Noise mechanic here.

let painting;
let wheat;
let sky;
let reaper;

function preload() {
  painting = loadImage('assets/vangogh.jpg');
}

function setup() {
  createCanvas(painting.width, painting.height);
  pixelDensity(1);

  wheat = new Wheat(painting);
  sky = new Sky(painting);
  reaper = new Reaper(painting);
}

function draw() {
  // Draw the original artwork first.
  image(painting, 0, 0);
  sky.display();

  // Your mouse mechanic, then your wheat layer.
  wheat.updateMouse();
  wheat.display();
  reaper.display();
}

// Clicking the painted figure starts a short harvesting movement.
function mousePressed() {
  if (reaper.contains(mouseX, mouseY)) reaper.start();
}

