let stalks = [];

let stalkCount = 180;

let windProgress = 0;
let windSpeed = 0.008;
let windStrength = 28;
let noiseScale = 0.004;

function createWheatField() {
  stalks = [];

  let rowCount = 6;
  let stalksPerRow = stalkCount / rowCount;

  for (let row = 0; row < rowCount; row++) {
    let depth = row / (rowCount - 1);

    let rowY = 340 + depth * 238;

    let minimumHeight = 30 + depth * 35;
    let maximumHeight = 48 + depth * 52;

    for (let column = 0; column < stalksPerRow; column++) {
      let spacing = 850 / stalksPerRow;

      let baseX =
        25 +
        (column + 0.5) * spacing +
        random(-8, 8);

      let baseY = rowY + random(-10, 10);

      let stalkHeight = random(
        minimumHeight,
        maximumHeight
      );

      let baseR = random(180, 225);
      let baseG = random(130, 178);
      let baseB = random(35, 65);

      let noiseOffset =
        baseX * noiseScale +
        random(-0.08, 0.08);

      let stalk = new WheatStalk(
        baseX,
        baseY,
        stalkHeight,
        baseR,
        baseG,
        baseB,
        noiseOffset
      );

      stalks.push(stalk);
    }
  }
}

function getWindBend(stalk) {
  let noiseValue = noise(
    stalk.noiseOffset + windProgress
  );

  let bend = (noiseValue - 0.5) * 2 * windStrength;

  return bend * stalk.stalkHeight / 100;
}

function updateWind() {
  windProgress += windSpeed;

  for (let i = 0; i < stalks.length; i++) {
    stalks[i].windBend = getWindBend(stalks[i]);
  }
}

function drawWheatField(colours) {
  for (let i = 0; i < stalks.length; i++) {
    stalks[i].draw(colours);
  }
}

class WheatStalk {
  constructor(
    baseX,
    baseY,
    stalkHeight,
    baseR,
    baseG,
    baseB,
    noiseOffset
  ) {
    this.baseX = baseX;
    this.baseY = baseY;

    this.stalkHeight = stalkHeight;

    this.baseR = baseR;
    this.baseG = baseG;
    this.baseB = baseB;

    this.noiseOffset = noiseOffset;

    this.windBend = 0;
    this.inputBend = 0;
  }

  draw(colours) {
    let totalBend = this.windBend + this.inputBend;

    let middleX = this.baseX + totalBend * 0.3;
    let middleY = this.baseY - this.stalkHeight * 0.5;

    let tipX = this.baseX + totalBend;
    let tipY = this.baseY - this.stalkHeight;

    let displayR = constrain(
      this.baseR + colours.wheatRShift,
      0,
      255
    );

    let displayG = constrain(
      this.baseG + colours.wheatGShift,
      0,
      255
    );

    let displayB = constrain(
      this.baseB + colours.wheatBShift,
      0,
      255
    );

    stroke(displayR, displayG, displayB);

    line(
      this.baseX,
      this.baseY,
      middleX,
      middleY
    );

    line(
      middleX,
      middleY,
      tipX,
      tipY
    );

    let headSize = this.stalkHeight * 0.12;

    for (let i = 0; i < 4; i++) {
      let headY = tipY + i * headSize * 0.55;
      let headX = tipX - totalBend * i * 0.025;

      line(
        headX,
        headY,
        headX - headSize * 0.55,
        headY - headSize * 0.45
      );

      line(
        headX,
        headY,
        headX + headSize * 0.55,
        headY - headSize * 0.45
      );
    }
  }
}