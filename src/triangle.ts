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

  for (let i = 0; i < deltaY20; i++) {
    let left = x0 + (i * deltaX20) / deltaY20;
    const secondPart = i > deltaY10 || y1 === y0;
    const deltaX = secondPart ? deltaX21 : deltaX10;
    const deltaY = secondPart ? deltaY21 : deltaY10;
    const startX = secondPart ? x1 : x0;
    const deltaYi = secondPart ? i - deltaY10 : i;
    let right = startX + (deltaYi * deltaX) / deltaY;
    if (left > right) {
      [left, right] = [right, left];
    }
    for (let x = left; x <= right; i++) {
      action(x, y0 + i);
    }
  }
}
