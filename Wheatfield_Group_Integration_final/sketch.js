// Shared integration: mouse, harvesting, Xinyan's time and Xinyue's noise.
// AI assistance: ChatGPT helped connect the modules and their drawing order.

let painting;
let wheat;
let sky;
let reaper;
let noiseField;
let timeControls;
let paintingCanvas;

function preload() {
  loadTimeImages();
}

function setup() {
  // preload() has finished: all image-derived layers share the sun-free artwork.
  painting = timePainting;
  paintingCanvas = createCanvas(painting.width, painting.height);
  paintingCanvas.parent('painting-stage');
  pixelDensity(1);

  wheat = new Wheat(painting);
  noiseField = new NoiseField(painting);
  wheat.setNoiseField(noiseField);
  sky = new Sky(painting);
  reaper = new Reaper(painting);
  timeControls = new TimeControls();
}

function draw() {
  timeControls.update();
  noiseField.update();
  // Natural sky variation continues even when the time-of-day clock is paused.
  updateSkyNoise();
  image(painting, 0, 0);
  sky.display();
  drawTimeSun();
  // This foreground also covers the field, so draw it before animated wheat.
  drawTimeMountains();

  // Your mouse mechanic, then your wheat layer.
  wheat.updateMouse();
  wheat.display();
  reaper.display();
  // Light reaches the moving layers too. Restore the green painted tree last.
  drawTimeLight();
  drawOriginalTree();
  timeControls.updateCursor();
}

// Clicking the painted figure starts a short harvesting movement.
function mousePressed(event) {
  if (event && event.target !== paintingCanvas.elt) return;
  if (timeControls.containsSun(mouseX, mouseY)) {
    timeControls.switchMode();
    return;
  }
  if (reaper.contains(mouseX, mouseY)) reaper.start();
}

function keyPressed(event) {
  if ((key === 'x' || key === 'X') && !(event && event.repeat)) {
    timeControls.togglePause();
    return false;
  }
}

