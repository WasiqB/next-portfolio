import config from '@payload-config';
import { getPayload } from 'payload';

let payload: Awaited<ReturnType<typeof getPayload>> | null = null;
export async function getPayloadClient() {
  if (!payload) {
    payload = await getPayload({ config });
  }
  return payload;
}
