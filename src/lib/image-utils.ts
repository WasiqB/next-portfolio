import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

export async function getImage(src: string) {
  let buffer: Buffer;

  if (src.startsWith('/')) {
    const filePath = path.join(process.cwd(), 'public', src);
    buffer = await fs.readFile(filePath);
  } else {
    buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
  }

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
}
