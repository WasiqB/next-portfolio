import type { MetadataRoute } from 'next';
import { domain } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
