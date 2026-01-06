'use server';

import { getPayloadClient } from '@/lib/payload-client';
import type { HomePage } from '../types';

export async function getHomePage(): Promise<HomePage | null> {
  // 'use cache';
  // cacheTag('homePage');
  // cacheLife('days');
  try {
    console.debug('Fetching Home page data...');
    const payload = await getPayloadClient();
    const homePage = await payload.findGlobal({
      slug: 'homePage',
    });
    console.debug(`Fetched Home page data: ${homePage}`);
    return homePage;
  } catch (error) {
    console.error(`Error occurred while fetching Home page data: ${error}`);
    return null;
  }
}
