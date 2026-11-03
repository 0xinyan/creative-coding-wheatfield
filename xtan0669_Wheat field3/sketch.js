// AI acknowledgement: ChatGPT/Codex assisted with image loading, the demo
// setup/draw scaffold, offline preview support, code organisation and comments.
// Artwork identification: https://www.vangoghmuseum.nl/en/collection/s0049V1962

let painting;
let noiseField;

function preload() {
  let source = typeof WHEAT_PREVIEW_IMAGE === 'string'
    ? WHEAT_PREVIEW_IMAGE : 'assets/vangogh.jpg';
  painting = loadImage(source);
}

function setup() {
  createCanvas(painting.width, painting.height);
  pixelDensity(1);
  noiseField = new NoiseField(painting);
}

function draw() {
  image(painting, 0, 0);
  noiseField.update();
  noiseField.display();
}
