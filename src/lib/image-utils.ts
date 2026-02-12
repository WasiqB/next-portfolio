import { cacheLife } from 'next/cache';
import { getPlaiceholder } from 'plaiceholder';
import { domain } from './constants';
import { fetchWithBypass } from './fetch-utils';

export async function getImage(src: string) {
  'use cache';
  cacheLife('days');
  const url = src.startsWith('/') ? `${domain}${src}` : src;
  try {
    const buffer = await fetchWithBypass(url, { cache: 'no-store' }).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { url, height, width },
    };
  } catch (error) {
    console.error(`Error generating plaiceholder for ${url}:`, error);
    return {
      base64: '',
      img: { url: 'https://placehold.net/600x600.png', height: 600, width: 600 },
    };
  }
}
