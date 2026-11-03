// Independent noise/randomness study, developed with ChatGPT/Codex assistance.
// Visual reference: teammate's original-painting presentation, not their code.
// No Wheat.js, mouse interaction, pixel arrays, mask or bilinear sampler is used.
// Course basis: arrays, loops, classes, random() and animated noise() sampling.
// image() source rectangles reuse small parts of the supplied reference artwork.

class NoiseField {
  constructor(painting) {
    this.painting = painting;
    this.patches = [];
    this.progress = 0;
    this.speed = 0.006;
    this.strength = 5;
    this.gustStart = random(100, 900);

    let patchWidth = 32;
    let patchHeight = 16;
    // Conservative areas of wheat. Leave the figure and upper landscape still.
    // This is a rough study layout, not a detailed outline of the painting.
    for (let y = 290; y < painting.height; y += patchHeight) {
      for (let x = 0; x < painting.width; x += patchWidth) {
        let fieldEdge = 365 - x * 0.18;
        let nearFigure = x < 245 && y < 440;
        if (y < fieldEdge || nearFigure) continue;
        this.patches.push({
          x: x,
          y: y,
          w: min(patchWidth, painting.width - x),
          h: min(patchHeight, painting.height - y),
          response: random(0.8, 1.2),
          offset: random(-0.025, 0.025)
        });
      }
    }
  }

  update() {
    this.progress += this.speed;
  }

  display() {
    let gust = 0.6 + noise(this.gustStart + this.progress * 0.3) * 0.8;
    let entrance = constrain(this.progress / 0.6, 0, 1);
    // Keep the destination rectangles fixed; move their source windows.
    // The unchanged original underneath covers areas outside our wheat patches.
    for (let i = 0; i < this.patches.length; i++) {
      let p = this.patches[i];
      let sample = noise(10 + p.x * 0.003 + p.y * 0.001 +
        p.offset + this.progress);
      let depth = (p.y - 260) / (this.painting.height - 260);
      let shift = (sample - 0.5) * 2 * this.strength * gust *
        p.response * depth * entrance;
      let sourceX = constrain(p.x - shift, 0, this.painting.width - p.w);
      image(this.painting, p.x, p.y, p.w, p.h,
        sourceX, p.y, p.w, p.h);
    }
  }
}
