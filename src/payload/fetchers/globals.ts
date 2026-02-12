'use server';

import { cacheLife, cacheTag } from 'next/cache';
import type { GlobalSlug } from 'payload';
import { cache } from 'react';
import { getPayloadClient } from '@/lib/payload-client';

export const getGlobalConfig = cache(async <T>(slug: GlobalSlug): Promise<T | null> => {
  'use cache';
  cacheTag(slug);
  cacheLife('days');
  const payload = await getPayloadClient();
  const config = await payload.findGlobal({
    slug,
  });
  return config as T;
});
