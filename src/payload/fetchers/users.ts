import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload-client';

export const getUserId = async () => {
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  return user?.id;
};
