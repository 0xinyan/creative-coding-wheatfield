// Shared sketch.js — standalone test of the Wheat class + mouse interaction.
// Teammates can later add their own Time / Noise mechanic here.

let painting;
let wheat;

function preload() {
  painting = loadImage('assets/vangogh.jpg');
}

function setup() {
  createCanvas(painting.width, painting.height);
  pixelDensity(1);

  wheat = new Wheat(painting);
}

function draw() {
  // Draw the original artwork first.
  image(painting, 0, 0);

  // Your mouse mechanic, then your wheat layer.
  wheat.updateMouse();
  wheat.display();
}
