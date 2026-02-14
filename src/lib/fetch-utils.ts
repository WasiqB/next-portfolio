import { CACHE_DURATION } from './constants';

export const fetchWithBypass = async (url: string, options?: { body?: BodyInit; next?: NextFetchRequestConfig }) => {
  const response = await fetch(url, {
    body: options?.body,
    cache: 'force-cache',
    signal: AbortSignal.timeout(5000),
    headers: {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '',
    },
    next: options?.next || {
      revalidate: CACHE_DURATION,
    },
  });
  return response;
};
