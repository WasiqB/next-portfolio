'use server';

import { cacheLife, cacheTag } from 'next/cache';
import type { GlobalSlug } from 'payload';
import { getPayloadClient } from '@/lib/payload-client';

export const getGlobalConfig = async <T>(slug: GlobalSlug): Promise<T | null> => {
  'use cache';
  cacheTag(slug.toString());
  cacheLife('days');
  const payload = await getPayloadClient();
  const config = await payload.findGlobal({
    slug,
  });
  return config as T;
};
