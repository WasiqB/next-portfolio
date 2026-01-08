'use server';

import type { GlobalSlug } from 'payload';
import { getPayloadClient } from '@/lib/payload-client';

export const getGlobalConfig = async <T>(slug: GlobalSlug): Promise<T | null> => {
  // 'use cache';
  // cacheTag('homePage');
  // cacheLife('days');
  try {
    console.debug(`Fetching Global [${slug}] config data...`);
    const payload = await getPayloadClient();
    const config = await payload.findGlobal({
      slug,
    });
    console.debug(`Fetched Global [${slug}] config data: ${config}`);
    return config as T;
  } catch (error) {
    console.error(`Error occurred while fetching Global [${slug}] config data: ${error}`);
    return null;
  }
};
