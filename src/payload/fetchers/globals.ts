import { getPayloadClient } from '@/lib/payload-client';

export async function getHomePage() {
  const payload = await getPayloadClient();
  const homePage = await payload.findGlobal({
    slug: 'homePage',
  });
  return homePage;
}
