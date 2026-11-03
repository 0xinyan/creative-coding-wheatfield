// AI acknowledgement: ChatGPT/Codex refined the noise-driven brightness
// adjustment and mosaic drawing loop. Static rectangle geometry remains fixed.
// Noise API: https://p5js.org/reference/p5/noise/
// Shared background layout reference: https://github.com/0xinyan/creative-coding-wheatfield/tree/Input

let skyProgress = 0;
let skySpeed = 0.004;
let skyStrength = 46;

function drawMosaicSky() {
  skyProgress += skySpeed;
  push();
  noStroke();
  for (let i = 0; i < SKY_COLOUR_BLOCKS.length; i++) {
    let block = SKY_COLOUR_BLOCKS[i];
    // Nearby blocks share a similar sample: patches of light drift smoothly.
    // Round to a common 6-pixel grid because some edge blocks are subdivided.
    let cellX = Math.floor(block[0] / 6) * 6;
    let cellY = Math.floor(block[1] / 6) * 6;
    let sample = noise(20 + cellX * 0.008 + cellY * 0.004 + skyProgress);
    let lightShift = (sample - 0.5) * 2 * skyStrength;
    let entrance = constrain(skyProgress / 0.8, 0, 1);
    lightShift *= entrance;
    // Leave the painted sun and its immediate glow steady.
    if (cellX >= 265 && cellX <= 345 && cellY < 90) lightShift = 0;
    let r = constrain(block[4] + lightShift, 0, 255);
    let g = constrain(block[5] + lightShift, 0, 255);
    let b = constrain(block[6] + lightShift * 0.7, 0, 255);
    fill(r, g, b);
    rect(block[0], block[1], block[2], block[3]);
  }
  pop();
}
