import { cacheLife, cacheTag } from 'next/cache';
import { getPlaiceholder } from 'plaiceholder';
import { fetchWithBypass } from './fetch-utils';

export async function getImage(src: string) {
  'use cache';
  cacheTag(src);
  cacheLife('days');
  try {
    const buffer = await fetchWithBypass(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { url: src, height, width },
    };
  } catch (error) {
    console.error(`Error generating plaiceholder for ${src}:`, error);
    return {
      base64: '',
      img: { url: 'https://placehold.net/600x600.png', height: 600, width: 600 },
    };
  }
}
