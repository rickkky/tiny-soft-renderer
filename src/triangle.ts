import { Vector2 } from 'vectrix';

export function triangleSweepLine(
  p0: Vector2,
  p1: Vector2,
  p2: Vector2,
  action: (x: number, y: number) => void,
) {
  if (p0.y === p1.y && p0.y === p2.y) {
    return;
  }

  // sort positions by y
  [p0, p1, p2] = [p0, p1, p2].sort((a, b) => a.y - b.y);

  const [[x0, y0], [x1, y1], [x2, y2]] = [p0, p1, p2];
  const deltaY20 = y2 - y0;
  const deltaY21 = y2 - y1;
  const deltaY10 = y1 - y0;
  const deltaX20 = x2 - x0;
  const deltaX21 = x2 - x1;
  const deltaX10 = x1 - x0;
  const k20Inv = deltaX20 / deltaY20;
  const k21Inv = deltaX21 / deltaY21;
  const k10Inv = deltaX10 / deltaY10;

  for (let i = 0; i <= deltaY20; i++) {
    let left = x0 + k20Inv * i;
    const secondPart = i > deltaY10 || y1 === y0;
    const kInv = secondPart ? k21Inv : k10Inv;
    const startX = secondPart ? x1 : x0;
    const deltaY = secondPart ? i - deltaY10 : i;
    let right = startX + kInv * deltaY;
    if (left > right) {
      [left, right] = [right, left];
    }
    left = Math.round(left);
    right = Math.round(right);
    for (let x = left; x <= right; x++) {
      action(x, y0 + i);
    }
  }
}
