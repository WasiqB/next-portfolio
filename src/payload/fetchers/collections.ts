'use server';

import { cacheLife, cacheTag } from 'next/cache';
import type { CollectionSlug } from 'payload';
import { cache } from 'react';
import { getPayloadClient } from '@/lib/payload-client';

export const getCollectionData = cache(async <T>(collection: CollectionSlug): Promise<T> => {
  'use cache';
  cacheTag(collection);
  cacheLife('days');
  const payload = await getPayloadClient();
  const collectionData = await payload.find({
    collection,
  });
  return collectionData.docs as T;
});
