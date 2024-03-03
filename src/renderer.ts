import { Vector2, Vector4 } from 'vectrix';
import { lineBresenham } from './line';

const BYTES_PER_PIXEL = 4;

export class Renderer {
  #imageData: ImageData;

  constructor(width: number, height: number) {
    this.#imageData = new ImageData(width, height);
  }

  get imageData() {
    return this.#imageData;
  }

  get width() {
    return this.#imageData.width;
  }

  get height() {
    return this.#imageData.height;
  }

  pixel(x: number, y: number, color: Vector4) {
    x = Math.trunc(x);
    y = Math.trunc(y);
    // flip y
    y = this.height - y - 1;
    const offset = (y * this.width + x) * BYTES_PER_PIXEL;
    for (let i = 0; i < BYTES_PER_PIXEL; i++) {
      this.#imageData.data[offset + i] = color[i];
    }
  }

  line(v0: Vector2, v1: Vector2, color: Vector4) {
    lineBresenham(v0, v1, (x, y) => this.pixel(x, y, color));
  }
}
