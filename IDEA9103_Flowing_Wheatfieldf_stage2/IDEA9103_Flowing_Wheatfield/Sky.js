// AI assistance: developed with ChatGPT to sample the original sky as colour blocks.
// Each block stores a colour once; display() keeps the original mountain boundary.
class Sky {
  constructor(painting) {
    this.pixelSize = 6;
    this.painting = painting;
    this.treeStrips = [];
    // Trace the left tree so its original brushwork stays above the pixel sky.
    const treeOutline = [
      [0, 240], [0, 193], [9, 174], [18, 178], [13, 207],
      [27, 187], [40, 175], [52, 149], [45, 145], [44, 136],
      [53, 128], [66, 125], [78, 130], [90, 143], [89, 158],
      [80, 158], [72, 146], [64, 152], [58, 151], [52, 174],
      [44, 199], [56, 188], [57, 205], [45, 226], [44, 240]
    ];
    // Intersect each image row with the outline and store its original-image strips.
    for (let y = 0; y < painting.height; y++) {
      const originalY = (y + 0.5) * 632 / painting.height;
      const crossings = [];
      for (let i = 0; i < treeOutline.length; i++) {
        const a = treeOutline[i];
        const b = treeOutline[(i + 1) % treeOutline.length];
        if ((a[1] <= originalY && b[1] > originalY) ||
            (b[1] <= originalY && a[1] > originalY)) {
          crossings.push((a[0] + (originalY - a[1]) *
            (b[0] - a[0]) / (b[1] - a[1])) * painting.width / 800);
        }
      }
      crossings.sort((a, b) => a - b);
      for (let i = 0; i + 1 < crossings.length; i += 2) {
        const left = max(0, floor(crossings[i]));
        const right = min(painting.width, ceil(crossings[i + 1]));
        if (right > left) this.treeStrips.push({ x: left, y: y, w: right - left });
      }
    }
    this.blocks = [];
    this.w = painting.width;
    this.h = painting.height;
    // Approximate sky/mountain outline, in the original 800 x 632 coordinates.
    this.boundary = [
      [0, 220], [65, 211], [95, 214], [145, 205], [185, 193],
      [210, 196], [250, 183], [290, 179], [335, 164], [352, 166],
      [375, 173], [400, 154], [435, 146], [465, 129], [495, 122],
      [525, 112], [550, 97], [565, 86], [578, 88], [590, 74],
      [606, 72], [616, 54], [660, 50], [684, 47], [704, 30],
      [737, 31], [765, 23], [800, 19]
    ];
    for (let y = 0; y < this.h; y += this.pixelSize) {
      for (let x = 0; x < this.w; x += this.pixelSize) {
        const sampleX = min(x + floor(this.pixelSize / 2), this.w - 1);
        // Keep colour samples above the mountain, including partial edge blocks.
        const sampleY = min(y + floor(this.pixelSize / 2), floor(this.skyBottom(sampleX)) - 1);
        if (sampleY < y) continue;
        this.blocks.push({ x: x, y: y, colour: painting.get(sampleX, sampleY) });
      }
    }
  }

  skyBottom(x) {
    const originalX = x * 800 / this.w;
    for (let i = 0; i < this.boundary.length - 1; i++) {
      const a = this.boundary[i];
      const b = this.boundary[i + 1];
      if (originalX <= b[0]) {
        return lerp(a[1], b[1], (originalX - a[0]) / (b[0] - a[0])) * this.h / 632;
      }
    }
    return 19 * this.h / 632;
  }

  display() {
    push();
    noStroke();
    rectMode(CORNER);
    for (const block of this.blocks) {
      fill(block.colour);
      // Thin columns trim edge blocks to the mountain outline without covering it.
      for (let x = block.x; x < min(block.x + this.pixelSize, this.w); x++) {
        const blockHeight = min(this.pixelSize, max(0, floor(this.skyBottom(x)) - block.y));
        if (blockHeight > 0) rect(x, block.y, 1, blockHeight);
      }
    }
    // Restore only the traced tree, rather than a rectangular patch of sky.
    imageMode(CORNER);
    noTint();
    for (const strip of this.treeStrips) {
      image(this.painting, strip.x, strip.y, strip.w, 1,
        strip.x, strip.y, strip.w, 1);
    }
    pop();
  }
}


