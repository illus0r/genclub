// Click within the image to change
// the value of the rectangle
// after the mouse has been clicked

let value = 0;
function draw() {
  noLoop()
  fill(value);
  rect(25, 25, 50, 50);
  describe('black 50-by-50 rect turns white with mouse click/press.');
}

function mouseClicked() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
}
