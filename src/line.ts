import { Vector2 } from 'vectrix';

/**
 * Bresenham line drawing algorithm.
 */
export function lineBresenham(
  v0: Vector2,
  v1: Vector2,
  action: (x: number, y: number) => void,
) {
  let [x0, y0] = v0;
  let [x1, y1] = v1;
  let steep = false;

  if (Math.abs(y1 - y0) > Math.abs(x1 - x0)) {
    steep = true;
    // swap x and y
    [x0, y0, x1, y1] = [y0, x0, y1, x1];
  }

  if (x0 > x1) {
    // swap v0 and v1
    [x0, x1, y0, y1] = [x1, x0, y1, y0];
  }

  const deltaX = x1 - x0;
  const deltaY = y1 - y0;
  // Let stepY = Math.abs(deltaY) / deltaX.
  // When x += 1, y += stepY.
  // Because the line is continuous,
  // we define a flag to store the changes of y.
  // When x += 1, flag += stepY;
  // if flag > 0.5, y += 1 (or -1), then flag -= 1.
  //
  // For optimization purpose,
  // let stepY = 2 * Math.abs(deltaY),
  // so that we can avoid using floating point numbers and division.
  // In this case,
  // if flag > deltaX, y += 1 (or -1), then flag -= deltaX * 2.
  const stepY = Math.abs(deltaY) * 2;
  let flag = 0;
  let y = y0;

  for (let x = x0; x <= x1; x += 1) {
    // if transposed, de-transpose
    if (steep) {
      action(y, x);
    } else {
      action(x, y);
    }

    flag += stepY;
    // carry > 0.5
    if (flag > deltaX) {
      y += deltaY > 0 ? 1 : -1;
      // carry -= 1
      flag -= deltaX * 2;
    }
  }
}
