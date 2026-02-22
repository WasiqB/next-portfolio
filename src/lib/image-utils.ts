import { cacheLife, cacheTag } from 'next/cache';
import { getPlaiceholder } from 'plaiceholder';
import { fetchWithBypass } from './fetch-utils';

export async function getImage(src: string, skipBlur = false) {
  'use cache';
  cacheTag(src);
  cacheLife('days');

  if (!src || src.includes('placehold.net') || skipBlur) {
    return {
      base64: '',
      img: { url: src || 'https://placehold.net/600x600.png', height: 600, width: 600 },
    };
  }

  try {
    const res = await fetchWithBypass(src);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);

    const buffer = Buffer.from(await res.arrayBuffer());

    // Use a simpler approach or add a timeout to getPlaiceholder
    const plaiceholderPromise = getPlaiceholder(buffer, { size: 10 });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Plaiceholder timeout')), 2000),
    );

    const {
      metadata: { height, width },
      ...plaiceholder
    } = (await Promise.race([plaiceholderPromise, timeoutPromise])) as any;

    return {
      ...plaiceholder,
      img: { url: src, height, width },
    };
  } catch (error) {
    console.error(`Error generating plaiceholder for ${src}:`, error);
    // Fallback: Return the src without base64 blurhash to avoid breaking the page
    return {
      base64: '',
      img: { url: src, height: 600, width: 600 },
    };
  }
}
