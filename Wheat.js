class Wheat {
  constructor(painting) {
    this.painting = painting;
    this.painting.loadPixels();

    this.w = painting.width;
    this.h = painting.height;
    this.layer = createImage(this.w, this.h);
    // This image is only edited through pixels: keep its buffer between frames.
    this.layer.loadPixels();

    // Tune these values to change the mouse effect.
    this.radius = 175;
    this.waveStrength = 28;
    this.verticalStrength = 9;

    this.mouseXPosition = 0;
    this.mouseYPosition = 0;
    this.mouseEnergy = 0;
    this.dragX = 0;
    this.dragY = 0;

    // Shared wind provider: noise computes offsets; Wheat draws the final image.
    this.noiseField = null;
    this.windX = 0;
    this.windY = 0;

    this.mask = new Uint8Array(this.w * this.h);
    this.basePixels = new Uint8ClampedArray(this.painting.pixels);

    // Mark which parts of the original image belong to the wheatfield.
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const edge = constrain((y - this.wheatTop(x) - 8) / 22, 0, 1);

        // Keep the reaper relatively still.
        const rx = max(105 - x, 0, x - 211);
        const ry = max(294 - y, 0, y - 421);
        const reaperFade = constrain(sqrt(rx * rx + ry * ry) / 24, 0, 1);

        const i = y * this.w + x;
        this.mask[i] = round(255 * edge * reaperFade);

        // Transparent outside the wheatfield, so teammates can draw
        // their own background without being covered by this layer.
        this.basePixels[i * 4 + 3] = this.mask[i];
      }
    }
  }

  // Approximate top boundary of the wheat field in this 800 x 632 painting.
  wheatTop(x) {
    const points = [
      [0, 345], [90, 342], [180, 333], [270, 302],
      [360, 278], [460, 287], [560, 277],
      [650, 252], [730, 226], [800, 213]
    ];

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (x <= b[0]) {
        const t = (x - a[0]) / (b[0] - a[0]);
        return lerp(a[1], b[1], t);
      }
    }
    return points[points.length - 1][1];
  }

  // YOUR mechanic: the mouse creates a moving wave in nearby wheat.
  updateMouse() {
    const inside = mouseX >= 0 && mouseX < width &&
                   mouseY >= 0 && mouseY < height;

    if (inside) {
      this.mouseXPosition = mouseX;
      this.mouseYPosition = mouseY;
    }

    const targetEnergy = inside ? 1 : 0;
    this.mouseEnergy = lerp(this.mouseEnergy, targetEnergy, 0.15);

    const movementX = inside ? constrain(mouseX - pmouseX, -25, 25) : 0;
    const movementY = inside ? constrain(mouseY - pmouseY, -25, 25) : 0;

    this.dragX = lerp(this.dragX, movementX * 1.5, 0.18);
    this.dragY = lerp(this.dragY, movementY * 0.7, 0.18);
  }

  // Optional hook for a teammate's Noise mechanic. NO noise() here.
  setNoiseOffset(x, y) {
    this.windX = x;
    this.windY = y;
  }

  // AI-assisted integration of Xinyue's spatial wind with the mouse displacement.
  setNoiseField(noiseField) {
    this.noiseField = noiseField;
  }

  display() {
    const hasWind = this.noiseField !== null || abs(this.windX) > 0.01 || abs(this.windY) > 0.01;

    // Original painting in sketch.js remains visible when interaction fades.
    if (this.mouseEnergy < 0.01 && !hasWind) return;

    const dst = this.layer.pixels;
    const src = this.painting.pixels;

    // Start each frame from a clean, masked copy of the painting.
    dst.set(this.basePixels);

    const left = hasWind ? 0 : max(0, floor(this.mouseXPosition - this.radius));
    const right = hasWind ? this.w : min(this.w, ceil(this.mouseXPosition + this.radius));
    const top = hasWind ? 200 : max(200, floor(this.mouseYPosition - this.radius));
    const bottom = hasWind ? this.h : min(this.h, ceil(this.mouseYPosition + this.radius));
    const radiusSquared = this.radius * this.radius;
    const rowBytes = this.w * 4;
    // AI-assisted performance change: only evaluate mouse waves inside its radius.
    // Colour interpolation below expands lerp(a,b,t) as a + (b-a)*t to avoid
    // millions of p5 wrapper calls; the sampling method stays the same.

    for (let y = top; y < bottom; y++) {
      const dy = y - this.mouseYPosition;
      const dySquared = dy * dy;
      const mouseInRow = this.mouseEnergy > 0 && dySquared < radiusSquared;
      const rowIndex = y * this.w;
      for (let x = left; x < right; x++) {
        const index = rowIndex + x;
        const maskStrength = this.mask[index] / 255;
        if (maskStrength <= 0) continue;

        const noiseShift = this.noiseField ? this.noiseField.getOffset(x, y) : 0;
        let shiftX = this.windX + noiseShift;
        let shiftY = this.windY;
        if (mouseInRow) {
          const dx = x - this.mouseXPosition;
          const d2 = dx * dx + dySquared;
          if (d2 < radiusSquared) {
            let influence = 1 - d2 / radiusSquared;
            influence = influence * influence * this.mouseEnergy;
            const waveX = sin(y * 0.065 + x * 0.027 - frameCount * 0.14);
            const waveY = cos(x * 0.055 + y * 0.025 - frameCount * 0.11);
            shiftX += (waveX * this.waveStrength + this.dragX) * influence;
            shiftY += (waveY * this.verticalStrength + this.dragY) * influence;
          }
        }
        shiftX *= maskStrength;
        shiftY *= maskStrength;
        const sx = Math.max(0, Math.min(x - shiftX, this.w - 2));
        const sy = Math.max(0, Math.min(y - shiftY, this.h - 2));
        const x0 = Math.floor(sx);
        const y0 = Math.floor(sy);
        const fx = sx - x0;
        const fy = sy - y0;

        const i00 = 4 * (y0 * this.w + x0);
        const i10 = i00 + 4;
        const i01 = i00 + rowBytes;
        const i11 = i01 + 4;
        const target = index * 4;

        // Bilinear sampling avoids the obvious square-pixel look.
        for (let c = 0; c < 3; c++) {
          const a = src[i00 + c] + (src[i10 + c] - src[i00 + c]) * fx;
          const b = src[i01 + c] + (src[i11 + c] - src[i01 + c]) * fx;
          dst[target + c] = a + (b - a) * fy;
        }
      }
    }

    this.layer.updatePixels();
    image(this.layer, 0, 0);
  }
}
