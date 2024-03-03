import { Renderer } from '/src';
import { vec2 } from 'vectrix';
import { randomColor } from '/common/util/color';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

const renderer = new Renderer(canvas.width, canvas.height);
renderer.line(vec2(70, 50), vec2(90, 50), randomColor());
renderer.line(vec2(65, 45), vec2(80, 40), randomColor());
renderer.line(vec2(60, 40), vec2(70, 30), randomColor());
renderer.line(vec2(55, 35), vec2(60, 20), randomColor());
renderer.line(vec2(50, 30), vec2(50, 10), randomColor());
renderer.line(vec2(45, 35), vec2(40, 20), randomColor());
renderer.line(vec2(40, 40), vec2(30, 30), randomColor());
renderer.line(vec2(35, 45), vec2(20, 40), randomColor());
renderer.line(vec2(30, 50), vec2(10, 50), randomColor());
renderer.line(vec2(35, 55), vec2(20, 60), randomColor());
renderer.line(vec2(40, 60), vec2(30, 70), randomColor());
renderer.line(vec2(45, 65), vec2(40, 80), randomColor());
renderer.line(vec2(50, 70), vec2(50, 90), randomColor());
renderer.line(vec2(55, 65), vec2(60, 80), randomColor());
renderer.line(vec2(60, 60), vec2(70, 70), randomColor());
renderer.line(vec2(65, 55), vec2(80, 60), randomColor());

context.putImageData(renderer.imageData, 0, 0);
