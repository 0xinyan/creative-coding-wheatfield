const SCENE_WIDTH = 900;
const SCENE_HEIGHT = 600;
const HORIZON_Y = 250;

let sceneMouseX = 0;
let sceneMouseY = 0;

let sceneState = {
  skyR: 190,
  skyG: 214,
  skyB: 195,

  groundR: 210,
  groundG: 171,
  groundB: 72,

  sunX: 690,
  sunY: 105,

  wheatRShift: 0,
  wheatGShift: 0,
  wheatBShift: 0
};

function setup() {
  createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  createWheatField();
}

function draw() {
  sceneMouseX = mouseX;
  sceneMouseY = mouseY;

  updateWind();

  drawSceneBackground();
  drawWheatField(sceneState);
}

function drawSceneBackground() {
  background(
    sceneState.skyR,
    sceneState.skyG,
    sceneState.skyB
  );

  noStroke();

  fill(247, 225, 139);
  circle(sceneState.sunX, sceneState.sunY, 76);

  fill(
    sceneState.groundR,
    sceneState.groundG,
    sceneState.groundB
  );

  rect(
    0,
    HORIZON_Y,
    SCENE_WIDTH,
    SCENE_HEIGHT - HORIZON_Y
  );
}