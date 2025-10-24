import { Data } from '@/data/portfolio-data';
import type { MetadataRoute } from 'next';

const staticRoutes = [
  '',
  '/about',
  '/testimonials',
  '/projects',
  '/services',
  '/sponsors',
  '/blogs',
  '/videos',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];
  staticRoutes.forEach((route) => {
    sitemap.push({
      url: `${Data.url}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });
  return sitemap;
}
