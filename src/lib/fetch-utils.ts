import { CACHE_DURATION } from './constants';

export const fetchWithBypass = async (
  url: string,
  options?: { body?: BodyInit; cache?: RequestCache; next?: NextFetchRequestConfig },
) => {
  const response = await fetch(url, {
    body: options?.body,
    cache: options?.cache,
    signal: AbortSignal.timeout(10000),
    headers: {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '',
    },
    next:
      options?.cache === 'no-store'
        ? undefined
        : options?.next || {
            revalidate: CACHE_DURATION,
          },
  });
  return response;
};
