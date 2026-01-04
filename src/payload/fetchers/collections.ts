'use server';

import type { CollectionSlug } from 'payload';
import { getPayloadClient } from '@/lib/payload-client';

export const getCollectionData = async <T>(collectionName: CollectionSlug): Promise<T> => {
  // 'use cache';
  // cacheTag(collectionName.toString());
  // cacheLife('days');
  const payload = await getPayloadClient();
  const socials = await payload.find({
    collection: collectionName,
  });
  return socials.docs as T;
};
