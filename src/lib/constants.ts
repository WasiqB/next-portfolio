export const CACHE_DURATION = 60 * 60 * 24;

export enum CACHE_TAGS {
  PROJECTS = 'projects',
  BLOGS = 'blogs',
  VIDEOS = 'videos',
}

export const isProd = process.env.VERCEL_ENV === 'production';
export const isPreview = process.env.VERCEL_ENV === 'preview';
export const isDev = process.env.VERCEL_ENV === 'development';
const appProtocol = isDev ? 'http' : 'https';
const rawDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;

export const domain = rawDomain ? `${appProtocol}://${rawDomain}` : 'http://localhost:3000';
