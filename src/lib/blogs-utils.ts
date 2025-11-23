'use server';

import * as cheerio from 'cheerio';
import { cacheLife, cacheTag } from 'next/cache';
import { stripHtml } from 'string-strip-html';
import type { Blog } from '@/types/portfolio-types';

const scrapeWebsite = async (url: string): Promise<Blog> => {
  'use cache';
  cacheLife('days');
  cacheTag('other-blogs');

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const getMeta = (name: string) =>
    $(`meta[name="${name}"]`).attr('content') ||
    $(`meta[property="${name}"]`).attr('content') ||
    $(`meta[property="og:${name}"]`).attr('content') ||
    $(`meta[property="twitter:${name}"]`).attr('content');

  return {
    source: getMeta('site_name') || '',
    title: getMeta('title') || $('title').text() || '',
    description: getMeta('description') || '',
    image: getMeta('image') || '',
    url,
    publishedAt: new Date(getMeta('article:published_time') || '').toISOString(),
    tags: [],
  } satisfies Blog;
};

const request = async (url: string) => {
  try {
    return await fetch(url).then((res) => res.json());
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error(`An unknown error occurred: ${error}`);
  }
};

const extractThumbnailFromMedium = (html: string) => {
  const figureRegex = /<figure[^>]*>(.*?)<img[^>]*src="([^"]*)"[^>]*>.*?<\/figure>/i;

  const match = figureRegex.exec(html);

  if (match && match.length >= 3) {
    return match[2];
  } else {
    return '';
  }
};

const textEllipsis = (str: string, length = 100, ending = '...') => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const formatMediumPost = (post: any): Blog => {
  return {
    title: post.title.trim(),
    description: textEllipsis(
      stripHtml(post.content, {
        stripTogetherWithTheirContents: ['script', 'style', 'xml', 'figure'],
      })
        .result.replace('\n', '')
        .trim(),
    ),
    image:
      post.thumbnail ||
      extractThumbnailFromMedium(
        stripHtml(post.description, {
          ignoreTagsWithTheirContents: ['figure'],
          stripTogetherWithTheirContents: ['script', 'style', 'xml', 'p'],
        })
          .result.replace('\n', '')
          .trim(),
      ),
    url: post.guid,
    tags: post.categories,
    publishedAt: new Date(post.pubDate).toISOString(),
    source: 'Medium',
  } satisfies Blog;
};

const getMediumPost = async (user: string): Promise<Blog[]> => {
  'use cache';
  cacheLife('days');
  cacheTag('medium-blogs');

  try {
    if (!user) return [];

    const response = await request(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${user}`);

    return response.items.map((item: any) => formatMediumPost(item));
  } catch (_error) {
    return [];
  }
};

export { scrapeWebsite, getMediumPost };
