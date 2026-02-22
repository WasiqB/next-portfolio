import type { MetadataRoute } from 'next';
import { domain } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/about', '/testimonials', '/projects', '/services', '/sponsors', '/blogs', '/videos'];

  return staticRoutes.map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));
}
