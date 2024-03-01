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

  const dx = x1 - x0;
  const dy = y1 - y0;
  // x += 1 => y += sy
  // Original:  sy = Math.abs(dy / dx)
  // Optimized: sy = sy * dx * 2
  const sy = Math.abs(dy) * 2;
  // indicate whether y will change
  let carry = 0;
  let y = y0;

  for (let x = x0; x <= x1; x += 1) {
    // if transposed, de-transpose
    if (steep) {
      action(y, x);
    } else {
      action(x, y);
    }

    carry += sy;
    // carry > 0.5
    if (carry > dx) {
      y += dy > 0 ? 1 : -1;
      // carry -= 1
      carry -= dx * 2;
    }
  }
}
