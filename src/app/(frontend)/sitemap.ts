import type { MetadataRoute } from 'next';
import { domain } from '@/lib/constants';

const staticRoutes = ['/', '/about', '/testimonials', '/projects', '/services', '/sponsors', '/blogs', '/videos'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];
  staticRoutes.forEach((route) => {
    sitemap.push({
      url: `${domain}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });
  return sitemap;
}
