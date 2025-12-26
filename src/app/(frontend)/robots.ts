import type { MetadataRoute } from 'next';
import { Data } from '@/data/portfolio-data';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: `${Data.url}/sitemap.xml`,
  };
}
