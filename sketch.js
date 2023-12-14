var tileSize = 20;
var scl = 0.1;

function setup() {
  createCanvas(1080, 720);
  noSmooth();
  noStroke();

  for (var i = 0; i < width / tileSize; i++) {
    for (var j = 0; j < height / tileSize; j++) {
      fill(calcColor(i, j));
      rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}

function draw() {}

function calcColor(x, y) {
  const v = noise(x * scl, y * scl);
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
