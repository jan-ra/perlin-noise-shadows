let tileSize = 1;
let scl = 0.02;
let wlevel = 0.3;

function setup() {
  createCanvas(600, 600);
  noSmooth();
  noStroke();

  genTerrain();
}

function draw() {}

function genTerrain() {
  for (var i = 0; i < width / tileSize; i++) {
    for (var j = 0; j < height / tileSize; j++) {
      fill(calcColor(i, j));
      rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}

function calcColor(x, y) {
  const v = calcNoise(x, y);

  if (v < 0.3) {
    return color("#62A6A9");
  } else if (v < 0.4) {
    return color("#D6B69E");
  } else if (v < 0.5) {
    return color("#98AD5A");
  } else if (v < 0.6) {
    return color("#658541");
  } else if (v < 0.7) {
    return color("#477645");
  } else if (v < 0.8) {
    return color("#6D7687");
  } else if (v < 0.9) {
    return color("#848D9A");
  } else {
    return color("#D2E0DE");
  }
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
