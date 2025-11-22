export const CACHE_DURATION = 60 * 60 * 24;

export const isProd = process.env.VERCEL_ENV === 'production';

export const isPreview = process.env.VERCEL_ENV === 'preview';

export const SITE_URL = isProd
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : isPreview
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : 'http://localhost:3000';
