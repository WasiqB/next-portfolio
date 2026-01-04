import { CACHE_DURATION } from './constants';

export const fetchWithBypass = async (url: string, body?: BodyInit) => {
  const response = await fetch(url, {
    body,
    headers: {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '',
    },
    next: {
      revalidate: CACHE_DURATION,
    },
  });
  return response;
};
