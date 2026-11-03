// Xinyan LIN — Time-based mechanic, built to work with the team's pixel Sky.js.
// AI acknowledgement: ChatGPT helped draft and explain this time-control code,
// and prepare three fixed image assets from the original Van Gogh painting.
// ALL animated colour changes are calculated LIVE with p5.js, not image sequences.
// Core techniques: frameCount, %, map(), if/else, for, get(), fill(), rect(), image().
// No tint(), noTint(), millis(), constrain(), or lerpColor().

let timePainting;
let timeSun;
let timeMountains;
let timeOriginalTree;
let timeProgress = 0;
let timeAfternoon = 0;
let timeSunset = 0;
let timeFrame = 0;

// The tracing points match the ridge used by our teammate's Sky.js.
// They are used ONLY by this independent preview; the group keeps its own Sky.js.
let timeSkyRidge = [
  [0,220], [65,211], [95,214], [145,205], [185,193],
  [210,196], [250,183], [290,179], [335,164], [352,166],
  [375,173], [400,154], [435,146], [465,129], [495,122],
  [525,112], [550,97], [565,86], [578,88], [590,74],
  [606,72], [616,54], [660,50], [684,47], [704,30],
  [737,31], [765,23], [800,19]
];
let timeSkyBlocks = [];

function loadTimeImages() {
  timePainting = loadImage('assets/painting-without-sun.jpg');
  timeSun = loadImage('assets/original-painted-sun.png');
  timeMountains = loadImage('assets/mountain-foreground.png');
  // Unmodified green tree taken from the original painting.
  timeOriginalTree = loadImage('assets/original-green-tree.png');
}

// Update the animation time once each draw() frame.
function updateTime() {
  timeFrame = frameCount % 840;
  timeAfternoon = 0;
  timeSunset = 0;
  timeProgress = 0;

  if (timeFrame < 240) {             // 0–4 sec: daylight to afternoon
    timeAfternoon = map(timeFrame, 0, 240, 0, 1);
    timeProgress = timeFrame / 600;
  } else if (timeFrame < 600) {      // 4–10 sec: afternoon to sunset
    timeAfternoon = 1;
    timeSunset = map(timeFrame, 240, 600, 0, 1);
    timeProgress = timeFrame / 600;
  } else if (timeFrame < 720) {      // 10–12 sec: hold at sunset
    timeAfternoon = 1;
    timeSunset = 1;
    timeProgress = 1;
  } else {                           // 12–14 sec: return to daylight
    timeAfternoon = map(timeFrame, 720, 840, 1, 0);
    timeSunset = timeAfternoon;
    timeProgress = 1;
  }
}

// This is the hook for the TEAM's Sky.js:
// It preserves the colour differences between original 6px pixel blocks,
// while adding a top-to-bottom amber/red gradient as the sun sets.
// mountain clipping follows the original contour, not a horizontal rectangle.
function timeSkyColor(originalColour, x, y, ridgeY) {
  let oldR = originalColour[0];
  let oldG = originalColour[1];
  let oldB = originalColour[2];

  // The sky should be orange/red above and amber near the mountains.
  // The vertical gradient is calculated from y, not pre-drawn in an image.
  let skyTopR = 248;
  let skyTopG = 73;
  let skyTopB = 43;
  let skyBottomR = 255;
  let skyBottomG = 183;
  let skyBottomB = 73;

  let yLevel = y / 230;
  if (yLevel > 1) { yLevel = 1; }

  let sunsetR = map(yLevel, 0, 1, skyTopR, skyBottomR);
  let sunsetG = map(yLevel, 0, 1, skyTopG, skyBottomG);
  let sunsetB = map(yLevel, 0, 1, skyTopB, skyBottomB);

  // Daylight: subtle warm-green sky. Afternoon: vivid golden sky.
  let dayR = oldR * 0.70 + 196 * 0.30;
  let dayG = oldG * 0.70 + 233 * 0.30;
  let dayB = oldB * 0.70 + 178 * 0.30;

  let afternoonR = oldR * 0.30 + 255 * 0.70;
  let afternoonG = oldG * 0.30 + 196 * 0.70;
  let afternoonB = oldB * 0.30 + 75 * 0.70;

  // Keep a little of the original image inside every pixel block.
  let red = dayR + (afternoonR - dayR) * timeAfternoon;
  let green = dayG + (afternoonG - dayG) * timeAfternoon;
  let blue = dayB + (afternoonB - dayB) * timeAfternoon;

  red = red + (sunsetR * 0.82 + oldR * 0.18 - red) * timeSunset;
  green = green + (sunsetG * 0.82 + oldG * 0.18 - green) * timeSunset;
  blue = blue + (sunsetB * 0.82 + oldB * 0.18 - blue) * timeSunset;

  // Preserve the continuous top-to-bottom gradient right down to the ridge.
  // The mountain foreground image softly covers the ridge edge after the sun.
  return [red, green, blue];
}

// The light affects the ENTIRE painting (mountains, wheat, tree and figure).
// Transparent full-size rectangles change colour without straight wheatfield lines.
function drawTimeLight() {
  push();
  noStroke();
  fill(255, 181, 47, 52 * timeAfternoon);
  rect(0, 0, width, height);
  fill(248, 106, 30, 46 * timeSunset);
  rect(0, 0, width, height);
  fill(138, 75, 22, 25 * timeSunset);
  rect(0, 0, width, height);
  pop();
}

// The original painted sun is moved, not replaced by a second drawn circle.
function drawTimeSun() {
  if (timeFrame >= 720) { return; }
  let sunX = map(timeProgress, 0, 1, 301, 515);
  let sunY = map(timeProgress, 0, 1, 39, 175);
  let sunSize = map(timeProgress, 0, 1, 102, 84);
  image(timeSun,
    (sunX - sunSize / 2) * width / 800,
    (sunY - sunSize / 2) * height / 632,
    sunSize * width / 800,
    sunSize * height / 632);
}

// This fixed mountain foreground is drawn after the sun so the sunset
// naturally sinks BEHIND the mountain. No horizon-coloured rectangle.
function drawTimeMountains() {
  image(timeMountains, 0, 0, width, height);
}

// Preview-only helpers, NOT a replacement for the teammate-owned Sky.js.
function previewSkyBottom(x) {
  for (let i = 0; i < timeSkyRidge.length - 1; i++) {
    let a = timeSkyRidge[i];
    let b = timeSkyRidge[i + 1];
    if (x <= b[0]) {
      return map(x, a[0], b[0], a[1], b[1]);
    }
  }
  return 19;
}

function prepareTimeSkyPreview() {
  timeSkyBlocks = [];
  for (let y = 0; y < 240; y = y + 6) {
    for (let x = 0; x < 800; x = x + 6) {
      let ridgeY = previewSkyBottom(x + 3);
      if (y < ridgeY) {
        let sampleX = x + 3;
        if (sampleX >= 800) { sampleX = 799; }
        let colour = timePainting.get(sampleX, y + 3);
        timeSkyBlocks.push([x, y, colour]);
      }
    }
  }
}

function drawTimeSkyPreview() {
  push();
  noStroke();
  for (let i = 0; i < timeSkyBlocks.length; i++) {
    let block = timeSkyBlocks[i];
    let x = block[0];
    let y = block[1];
    let ridge = previewSkyBottom(x + 3);
    let tall = 6;
    if (y + 6 > ridge) { tall = ridge - y; }
    let col = timeSkyColor(block[2], x, y, ridge);
    fill(col[0], col[1], col[2]);
    if (tall > 0) {
      rect(x * width / 800, y * height / 632,
           6 * width / 800, tall * height / 632);
    }
  }
  pop();
}

// Keep the tree's original green foliage and trunk visible above warm sky.
// This is a fixed crop of the ORIGINAL tree, not a prepared colour frame.
function drawOriginalTree() {
  image(timeOriginalTree, 0, 0, width, height);
}

// Standalone preview. The real group Sky.js can use timeSkyColor() directly.
function drawTimePreview() {
  updateTime();
  image(timePainting, 0, 0, width, height);
  drawTimeSkyPreview();
  drawTimeSun();
  drawTimeMountains();
  drawTimeLight();
  // Restore the tree after the colour light overlay so it stays green.
  drawOriginalTree();
}
