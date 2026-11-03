// Individual demo only. The group sketch.js will integrate the modules.
// ChatGPT assisted with the time-based pixel colour transition in Time.js.
function preload() {
  loadTimeImages();
}
function setup() {
  createCanvas(800, 632);
  prepareTimeImages();
}
function draw() {
  drawTimeEffect();
}
