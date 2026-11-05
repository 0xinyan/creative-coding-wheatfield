// Tang Xinyue's sky brightness noise, connected to the shared sky colour loop.
// AI assistance: ChatGPT adapted the colour calculation to run after Time.
let skyProgress = 0;
let skySpeed = 0.004;
let skyStrength = 60;

function updateSkyNoise() {
  skyProgress += skySpeed;
}

function skyNoiseColor(colour, x, y) {
  const cellX = Math.floor(x / 6) * 6;
  const cellY = Math.floor(y / 6) * 6;
  const sample = noise(20 + cellX * 0.008 + cellY * 0.004 + skyProgress);
  const entrance = constrain(skyProgress / 0.8, 0, 1);
  const lightShift = (sample - 0.5) * 2 * skyStrength * entrance;
  // The moving sun is a separate layer, so its colour does not need a fixed mask.
  return [constrain(colour[0] + lightShift, 0, 255),
    constrain(colour[1] + lightShift, 0, 255),
    constrain(colour[2] + lightShift * 0.7, 0, 255)];
}
