// AI assistance: ChatGPT helped extract painted body parts and animate joints.
// Original image cutouts are moved with translate(), rotate() and lerp().
class Reaper {
  constructor(painting) {
    this.painting = painting;
    this.startedAt = -1;
    this.duration = 2100;
    this.x = 136; this.y = 296; this.w = 78; this.h = 61;
    this.bodyOutline = [[141,338],[147,330],[157,323],[164,320],
      [158,316],[155,309],[158,302],[166,299],[177,302],[184,308],
      [184,320],[178,327],[180,338],[173,349],[163,354],[147,351]];
    this.armOutline = [[161,329],[174,329],[185,333],[194,328],
      [195,318],[199,313],[205,315],[206,323],[202,336],[195,344],
      [181,345],[166,341]];
    this.body = this.makeLayer(this.bodyOutline);
    this.arm = this.makeLayer(this.armOutline);
    this.background = this.makeLayer(null);
  }

  inside(x, y, outline) {
    let result = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const a = outline[i], b = outline[j];
      if ((a[1] > y) !== (b[1] > y) &&
          x < (b[0]-a[0]) * (y-a[1]) / (b[1]-a[1]) + a[0]) result = !result;
    }
    return result;
  }

  makeLayer(outline) {
    const layer = createImage(this.w, this.h);
    layer.loadPixels();
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const px = this.x + x, py = this.y + y;
        const included = outline ? this.inside(px+0.5, py+0.5, outline) :
          this.inside(px+0.5, py+0.5, this.bodyOutline) ||
          this.inside(px+0.5, py+0.5, this.armOutline);
        if (!included) continue;
        // Fill behind the moving figure with nearby wheat, only in its silhouette.
        const sourceX = outline ? px : px + 95;
        const source = 4 * (py * this.painting.width + sourceX);
        const target = 4 * (y * this.w + x);
        for (let c = 0; c < 3; c++) layer.pixels[target+c] = this.painting.pixels[source+c];
        layer.pixels[target+3] = 255;
      }
    }
    layer.updatePixels();
    return layer;
  }

  contains(x, y) {
    return x >= 120 && x <= 210 && y >= 302 && y <= 400;
  }

  start() {
    if (this.startedAt < 0) this.startedAt = millis();
  }

  display() {
    if (this.startedAt < 0) return;
    const progress = (millis() - this.startedAt) / this.duration;
    if (progress >= 1) { this.startedAt = -1; return; }
    // Reach slowly, cut faster, then return. Angles are in radians.
    const smooth = t => t * t * (3 - 2 * t);
    let bend, swing;
    if (progress < 0.35) {
      const t = smooth(progress / 0.35);
      bend = lerp(0, 0.13, t); swing = lerp(0, -0.25, t);
    } else if (progress < 0.65) {
      const t = smooth((progress - 0.35) / 0.30);
      bend = lerp(0.13, 0.25, t); swing = lerp(-0.25, 0.65, t);
    } else {
      const t = smooth((progress - 0.65) / 0.35);
      bend = lerp(0.25, 0, t); swing = lerp(0.65, 0, t);
    }
    push();
    imageMode(CORNER);
    angleMode(RADIANS);
    noTint();
    image(this.background, this.x, this.y);
    // Rotate upper body at the waist; the original legs stay planted.
    translate(158, 350);
    rotate(bend);
    image(this.body, this.x - 158, this.y - 350);
    // Rotate arm at the shoulder, in the body's coordinate system.
    translate(10, -17);
    rotate(swing);
    image(this.arm, this.x - 168, this.y - 333);
    // Curved sickle follows the hand instead of warping surrounding pixels.
    stroke(101,87,48); strokeWeight(2);
    line(33,-13,40,-24);
    noFill(); stroke(120,119,85); strokeWeight(1.8);
    arc(46,-19,18,15,Math.PI,Math.PI*1.85);
    pop();
  }
}
