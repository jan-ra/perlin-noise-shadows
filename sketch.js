let tileSize = 1;
let scl = 0.01;
let wlevel = 0.3;
let hMap, cMap, screenMap;
let sun;
let shadowShader;

function preload() {
  shadowShader = loadShader(
    "/shaders/vertex_shader.glsl",
    "/shaders/frac_shader.glsl"
  );
}

function setup() {
  createCanvas(600, 600);
  noSmooth();

  hMap = createGraphics(width / tileSize, height / tileSize);
  cMap = createGraphics(width / tileSize, height / tileSize);
  screenMap = createGraphics(width / tileSize, height / tileSize, WEBGL);

  sun = createVector(0, 0.5, 1);

  genTerrain();

  screenMap.shader(shadowShader);
}

function draw() {
  shadowShader.setUniform("colour", cMap);
  shadowShader.setUniform("height", hMap);
  shadowShader.setUniform("sunPos", [sun.x, sun.y, sun.z]);

  screenMap.clear();
  screenMap.rect(0, 0, width / tileSize, height / tileSize);

  image(screenMap, 0, 0, width, height);
}

function genTerrain() {
  for (var i = 0; i < width / tileSize; i++) {
    for (var j = 0; j < height / tileSize; j++) {
      calcTile(i, j);
    }
  }
}

function calcTile(x, y) {
  const v = calcNoise(x, y);

  hMap.noStroke();
  hMap.fill(255 * v);
  hMap.square(x, y, 1);

  cMap.noStroke();
  if (v <= 0.3) {
    cMap.fill(color("#62A6A9"));
  } else if (v <= 0.4) {
    cMap.fill(color("#D6B69E"));
  } else if (v <= 0.5) {
    cMap.fill(color("#98AD5A"));
  } else if (v <= 0.6) {
    cMap.fill(color("#658541"));
  } else if (v <= 0.7) {
    cMap.fill(color("#477645"));
  } else if (v <= 0.8) {
    cMap.fill(color("#6D7687"));
  } else if (v <= 0.9) {
    cMap.fill(color("#848D9A"));
  } else {
    cMap.fill(color("#D2E0DE"));
  }
  cMap.square(x, y, 1);
}

function calcNoise(x, y) {
  let v = noise(x * scl, y * scl);
  v *= islandModifier(x, y);
  return max(wlevel, v);
}

function islandModifier(x, y) {
  let maxDist = min(width / tileSize, height / tileSize);
  maxDist = (maxDist / 2) * (maxDist / 2);

  const dx = width / tileSize / 2 - x;
  const dy = height / tileSize / 2 - y;

  const dSq = dx * dx + dy * dy;

  return map(dSq, 0, maxDist, 1, 0);
}
