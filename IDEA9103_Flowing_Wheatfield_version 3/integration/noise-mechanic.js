// Tang Xinyue's Perlin-noise/randomness wind, adapted for the shared renderer.
// AI assistance: ChatGPT retained the original wind formula and stable random
// response, replacing separate image patches with an interpolated offset grid.
class NoiseField {
  constructor(painting) {
    this.painting = painting;
    this.progress = 0;
    this.speed = 0.009;
    this.strength = 22;
    this.gustStart = random(100, 900);
    this.cellWidth = 32;
    this.cellHeight = 16;
    this.columns = ceil(painting.width / this.cellWidth) + 1;
    this.rows = ceil(painting.height / this.cellHeight) + 1;
    this.points = [];
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.points.push({
          x: column * this.cellWidth,
          y: row * this.cellHeight,
          response: random(0.95, 1.05),
          offset: random(-0.015, 0.015),
          shift: 0
        });
      }
    }
  }

  update() {
    this.progress += this.speed;
    const gust = 0.6 + noise(this.gustStart + this.progress * 0.3) * 0.8;
    const entrance = constrain(this.progress / 0.6, 0, 1);
    for (const point of this.points) {
      const sample = noise(10 + point.x * 0.003 + point.y * 0.001 +
        point.offset + this.progress);
      const depth = constrain((point.y - 260) / (this.painting.height - 260), 0, 1);
      point.shift = constrain((sample - 0.5) * 2 * this.strength * gust *
        point.response * depth * entrance, -18, 18);
    }
  }

  getOffset(x, y) {
    // Blend four neighbouring wind samples so the old patch edges disappear.
    const column = Math.floor(x / this.cellWidth);
    const row = Math.floor(y / this.cellHeight);
    const fx = x / this.cellWidth - column;
    const fy = y / this.cellHeight - row;
    const index = row * this.columns + column;
    // Same lerp formula, expanded in this per-pixel method to reduce call overhead.
    const a = this.points[index].shift;
    const b = this.points[index + 1].shift;
    const c = this.points[index + this.columns].shift;
    const d = this.points[index + this.columns + 1].shift;
    const top = a + (b - a) * fx;
    const bottom = c + (d - c) * fx;
    return top + (bottom - top) * fy;
  }
}
