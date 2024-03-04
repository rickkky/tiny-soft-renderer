import { Vector2 } from 'vectrix';

export function sweepLine(
  p0: Vector2,
  p1: Vector2,
  p2: Vector2,
  action: (x: number, y: number) => void,
) {
  // sort positions by y
  [p0, p1, p2] = [p0, p1, p2].sort((a, b) => a.y - b.y);

  const [[x0, y0], [x1, y1], [x2, y2]] = [p0, p1, p2];

  const deltaX20 = x2 - x0;
  const deltaX21 = x2 - x1;
  const deltaX10 = x1 - x0;
  const deltaY20 = y2 - y0;
  // plus 1 to avoid division by 0
  const deltaY21 = y2 - y1 + 1;
  const deltaY10 = y1 - y0 + 1;
  const k20 = deltaX20 / deltaY20;
  const k21 = deltaX21 / deltaY21;
  const k10 = deltaX10 / deltaY10;

  for (let y = p0.y; y <= p2.y; y++) {
    let left = x0 + k20 * (y - y0);
    let right = y <= y1 ? x0 + k10 * (y - y0) : x1 + k21 * (y - y1);
    if (left > right) {
      [left, right] = [right, left];
    }
    for (let x = left; x <= right; x++) {
      action(x, y);
    }
  }
}
