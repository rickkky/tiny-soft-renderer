import { vec4 } from 'vectrix';

export function randomColor() {
  return vec4(
    Math.trunc(Math.random() * 256),
    Math.trunc(Math.random() * 256),
    Math.trunc(Math.random() * 256),
    255,
  );
}
