// Independent noise-only demonstration scaffold, with ChatGPT/Codex assistance.
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
