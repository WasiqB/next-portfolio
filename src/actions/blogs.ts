'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { Data as portfolioData } from '@/data/portfolio-data';
import { SITE_URL } from '@/lib/constants';
import type { Blog } from '@/types/portfolio-types';

const getBlogs = async () => {
  'use cache';
  cacheTag('blogs');
  cacheLife('days');
  try {
    const blogsPromise = portfolioData.blogs.sources.map(async (source) => {
      if (source.source === 'Medium') {
        const response = await fetch(`${SITE_URL}/api/blogs?username=${source.username}`);
        return response.json() as Promise<Blog[]>;
      } else {
        const customBlogsPromise = source.urls?.map(async (url) => {
          const response = await fetch(`${SITE_URL}/api/blogs?url=${url}`);
          return response.json() as Promise<Blog[]>;
        });
        const customBlogs = await Promise.all(customBlogsPromise || []);
        return customBlogs.flat();
      }
    });
    const blogs = await Promise.all(blogsPromise);
    return blogs.flat();
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

export { getBlogs };
