import { getPayloadClient } from '@/lib/payload-client';

export const getSocials = async () => {
  const payload = await getPayloadClient();
  const socials = await payload.find({
    collection: 'socials',
  });
  return socials.docs;
};
