import { MetadataRoute } from 'next';
import { Data } from './data/portfolio-data';

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
  let sitemap: MetadataRoute.Sitemap = [];
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
