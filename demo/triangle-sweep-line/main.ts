import { Renderer } from '/src';
import { triangleSweepLine } from '/src/triangle';
import { vec2 } from 'vectrix';
import { randomColor } from '/common/util/color';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

const renderer = new Renderer(canvas.width, canvas.height);
const createAction = () => {
  const color = randomColor();
  return (x: number, y: number) => renderer.pixel(x, y, color);
};
triangleSweepLine(vec2(10, 40), vec2(40, 50), vec2(30, 80), createAction());
triangleSweepLine(vec2(70, 0), vec2(90, 30), vec2(40, 90), createAction());
triangleSweepLine(vec2(70, 70), vec2(90, 65), vec2(80, 90), createAction());
triangleSweepLine(vec2(10, 10), vec2(30, 10), vec2(10, 30), createAction());
context.putImageData(renderer.imageData, 0, 0);
