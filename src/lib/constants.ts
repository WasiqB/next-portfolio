export const CACHE_DURATION = 60 * 60 * 24;

export const isProd = process.env.VERCEL_ENV === 'production';
export const isPreview = process.env.VERCEL_ENV === 'preview';
export const isDev = process.env.VERCEL_ENV === 'development';
export const appProtocol = isDev ? 'http' : 'https';
