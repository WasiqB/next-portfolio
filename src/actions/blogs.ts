'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { Data as portfolioData } from '@/data/portfolio-data';
import { getMediumPost, scrapeWebsite } from '@/lib/blogs-utils';
import type { Blog } from '@/types/portfolio-types';

const getBlogs = async () => {
  'use cache';
  cacheLife('days');
  cacheTag('blogs');

  try {
    const blogsPromise = portfolioData.blogs.sources.map(async (source) => {
      let blogs: Blog[] = [];
      if (source.source === 'Medium') {
        blogs = await getMediumPost(source.username!);
      } else {
        const customBlogsPromise = source.urls?.map(async (url) => {
          const otherBlogs = await scrapeWebsite(url);
          return otherBlogs;
        });
        blogs = (await Promise.all(customBlogsPromise || [])).flat();
      }
      return blogs;
    });
    const blogs = await Promise.all(blogsPromise);
    return blogs.flat();
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

export { getBlogs };
