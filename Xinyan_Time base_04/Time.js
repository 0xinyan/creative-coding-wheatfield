// Xinyan LIN — Time-based Mechanic (Painterly Sunset)
// AI acknowledgement: ChatGPT assisted with developing and explaining this code.
// Pixel processing reference: https://p5js.org/reference/p5.Image/loadPixels/
// and https://p5js.org/reference/p5.Image/updatePixels/
// These pixel functions may be beyond the lecture materials and are documented here.
// ALL changing colours are computed in p5.js; NO prepared sunset frames.
// Fix: removed an x/y rectangular tree-protection condition that caused
// a visible rectangular colour seam on the left side of the painting.

let basePainting;
let mountainForeground;
let sunPainting;
let colouredPainting;
let colouredMountains;

function loadTimeImages() {
  basePainting = loadImage('assets/base-painting.png');
  mountainForeground = loadImage('assets/mountain-foreground.png');
  sunPainting = loadImage('assets/painted-sun.png');
}

function prepareTimeImages() {
  // Create reusable images once rather than new images every frame.
  colouredPainting = createImage(basePainting.width, basePainting.height);
  colouredMountains = createImage(mountainForeground.width, mountainForeground.height);
  basePainting.loadPixels();
  mountainForeground.loadPixels();
}

function updatePaintingColours(progress) {
  // Smooth the transition, avoiding sudden changes at the start and end.
  let t = progress * progress * (3 - 2 * progress);
  colouredPainting.loadPixels();
  colouredMountains.loadPixels();

  let w = basePainting.width;
  let h = basePainting.height;

  for (let y = 0; y < h; y++) {
    // The sky is redder higher up and golden near the mountains.
    let skyHeight = y / (h * 0.40);
    if (skyHeight > 1) skyHeight = 1;

    let sunsetR = map(skyHeight, 0, 1, 190, 255);
    let sunsetG = map(skyHeight, 0, 1, 92, 168);
    let sunsetB = map(skyHeight, 0, 1, 108, 83);

    for (let x = 0; x < w; x++) {
      let i = (y * w + x) * 4;
      let r = basePainting.pixels[i];
      let g = basePainting.pixels[i + 1];
      let b = basePainting.pixels[i + 2];

      // The mask edge is soft. Blend land and sky colours continuously.
      // This prevents triangular seams caused by a hard alpha threshold.
      let maskAlpha = mountainForeground.pixels[i + 3];
      let landPart = maskAlpha / 255;
      let skyPart = 1 - landPart;

      // Sky preserves variation in the source painting's brush marks.
      let brush = (r - 207) * 0.4 + (g - 215) * 0.3 + (b - 161) * 0.18;
      let blend = t * 0.83;
      let skyR = r * (1 - blend) + (sunsetR + brush * 0.5) * blend;
      let skyG = g * (1 - blend) + (sunsetG + brush * 0.5) * blend;
      let skyB = b * (1 - blend) + (sunsetB + brush * 0.5) * blend;

      // Recolour the land without replacing its original painted detail.
      let darkening = 0;
      if (y > h * 0.58) {
        darkening = map(y, h * 0.58, h, 0, 0.12);
      }
      // Use one continuous land-colour rule across the WHOLE canvas.
      // The earlier rectangular tree-protection rule introduced a visible
      // vertical/horizontal patch near the left-side hills.
      // A gentle colour adjustment preserves the green tree naturally.
      let landT = t;
      let landR = r * (1 + 0.025 * landT) + 5 * landT;
      let landG = g * (1 - 0.22 * landT - darkening * t);
      let landB = b * (1 - 0.27 * landT - darkening * t);

      let newR = skyR * skyPart + landR * landPart;
      let newG = skyG * skyPart + landG * landPart;
      let newB = skyB * skyPart + landB * landPart;

      colouredPainting.pixels[i] = newR;
      colouredPainting.pixels[i + 1] = newG;
      colouredPainting.pixels[i + 2] = newB;
      colouredPainting.pixels[i + 3] = 255;

      // IMPORTANT: use precisely the SAME recoloured RGB as the background.
      // The foreground image is now an occlusion mask ONLY: it covers the
      // descending sun but does not alter any mountain or field colours.
      // This removes the triangle/patch created by mismatched overlays.
      colouredMountains.pixels[i] = newR;
      colouredMountains.pixels[i + 1] = newG;
      colouredMountains.pixels[i + 2] = newB;
      colouredMountains.pixels[i + 3] = maskAlpha;
    }
  }

  colouredPainting.updatePixels();
  colouredMountains.updatePixels();
}

function drawTimeEffect() {
  // 10 seconds sunset + 2 second hold + 2 second return (about 60 fps).
  let cycle = frameCount % 840;
  let progress = 0;
  let sunVisible = true;

  if (cycle < 600) {
    progress = cycle / 600;
  } else if (cycle < 720) {
    progress = 1;
    sunVisible = false;
  } else {
    progress = map(cycle, 720, 840, 1, 0);
    sunVisible = false;
  }

  // Pixel recolouring is relatively expensive: refresh every four frames.
  // The sun itself moves every frame.
  if (frameCount < 2 || frameCount % 4 === 0) {
    updatePaintingColours(progress);
  }

  image(colouredPainting, 0, 0, width, height);

  if (sunVisible) {
    // These coordinates are in the 800 x 632 preview coordinate system.
    let sunX = map(progress, 0, 1, 301, 520);
    let sunY = map(progress, 0, 1, 38, 210);
    let sunSize = map(progress, 0, 1, 100, 84);
    image(sunPainting,
      (sunX - sunSize / 2) * width / 800,
      (sunY - sunSize / 2) * height / 632,
      sunSize * width / 800,
      sunSize * height / 632);
  }

  // Paint the mountain layer LAST so the sun actually goes behind it.
  image(colouredMountains, 0, 0, width, height);
}
