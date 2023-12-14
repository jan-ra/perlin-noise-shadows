var tileSize = 20;

function setup() {
  createCanvas(1080, 720);
  noSmooth();

  for (var i = 0; i < width / tileSize; i++) {
    for (var j = 0; j < height / tileSize; j++) {
      fill(noise(i, j) * 255);
      rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}

function draw() {}
