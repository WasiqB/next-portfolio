import { getMediumPost, scrapeWebsite } from '@/lib/blogs-utils';
import type { Blog } from '@/types/portfolio-types';

export async function fetchBlogsAction(params: {
  username?: string;
  url?: string;
}): Promise<Blog[] | Blog | { error: string }> {
  const { username, url } = params;

  if (!username && !url) {
    return { error: 'Username or url is required' };
  }

  try {
    if (username) {
      const posts = await getMediumPost(username);
      return posts;
    }

    if (url) {
      const post = await scrapeWebsite(url);
      return post;
    }
  } catch (error) {
    console.error('Error in fetchBlogsAction:', error);
    return { error: 'Failed to fetch blogs' };
  }

  return { error: 'Invalid parameters' };
}
