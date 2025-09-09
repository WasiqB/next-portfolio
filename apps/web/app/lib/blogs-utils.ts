import { Blog } from '@/app/types/portfolio-types';
import * as cheerio from 'cheerio';
import { stripHtml } from 'string-strip-html';
import { CACHE_DURATION } from './constants';

const scrapeWebsite = async (url: string): Promise<Blog> => {
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
    publishedAt: new Date(
      getMeta('article:published_time') || ''
    ).toISOString(),
    tags: [],
  } satisfies Blog;
};

const request = async (url: string) => {
  try {
    return await fetch(url, {
      next: {
        revalidate: CACHE_DURATION,
      },
    }).then((res) => res.json());
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error(`An unknown error occurred: ${error}`);
  }
};

const extractThumbnailFromMedium = (html: string) => {
  const figureRegex =
    /<figure[^>]*>(.*?)<img[^>]*src="([^"]*)"[^>]*>.*?<\/figure>/i;

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

const formatMediumPost = (post: any) => {
  return {
    title: post.title.trim(),
    description: textEllipsis(
      stripHtml(post.content, {
        stripTogetherWithTheirContents: ['script', 'style', 'xml', 'figure'],
      })
        .result.replace('\n', '')
        .trim()
    ),
    image:
      post.thumbnail ||
      extractThumbnailFromMedium(
        stripHtml(post.content, {
          ignoreTagsWithTheirContents: ['figure'],
          stripTogetherWithTheirContents: ['script', 'style', 'xml', 'p'],
        })
          .result.replace('\n', '')
          .trim()
      ),
    url: post.guid,
    tags: post.categories,
    publishedAt: new Date(post.pubDate).toISOString(),
    source: 'Medium',
  } satisfies Blog;
};

const getMediumPost = async (user: string) => {
  try {
    if (!user) return [];

    let response = await request(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${user}`
    );

    return response.items.map((item: any) => formatMediumPost(item));
  } catch (error) {
    return [];
  }
};

export { getMediumPost, scrapeWebsite };
