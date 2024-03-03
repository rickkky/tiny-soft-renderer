import { Renderer } from '/src';
import { OBJLoader } from '@loaders.gl/obj';
import { load } from '@loaders.gl/core';
import { vec3, vec4 } from 'vectrix';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

const width = canvas.width;
const height = canvas.height;
const renderer = new Renderer(width, height);

const mesh = await load('/asset/model/head/head.obj', OBJLoader);
const positionAttribute = mesh.attributes.POSITION;
const positionData = positionAttribute.value;
for (let i = 0; i < positionData.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    const index = i * 3 + j * 3;
    const v0 = vec3(
      positionData[index],
      positionData[index + 1],
      positionData[index + 2],
    );
    const nextIndex = i * 3 + ((j + 1) % 3) * 3;
    const v1 = vec3(
      positionData[nextIndex],
      positionData[nextIndex + 1],
      positionData[nextIndex + 2],
    );
    v0.x = ((v0.x + 1) * width) / 2;
    v0.y = ((v0.y + 1) * height) / 2;
    v1.x = ((v1.x + 1) * width) / 2;
    v1.y = ((v1.y + 1) * height) / 2;
    renderer.line(v0.xy, v1.xy, vec4(0, 0, 0, 255));
  }
}

context.putImageData(renderer.imageData, 0, 0);
