import * as cheerio from 'cheerio';
import { stripHtml } from 'string-strip-html';
import type { Blog, MediumBlog } from '@/types/portfolio-types';
import { CACHE_DURATION } from './constants';

const getBlogSource = (url: string): string => {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace('www.', '');
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const domain = parts[parts.length - 2];
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    }
    return hostname.charAt(0).toUpperCase() + hostname.slice(1);
  } catch {
    return 'Blog';
  }
};

const scrapeWebsite = async (url: string): Promise<Blog> => {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const getMeta = (name: string) =>
    $(`meta[name="${name}"]`).attr('content') ||
    $(`meta[property="${name}"]`).attr('content') ||
    $(`meta[property="og:${name}"]`).attr('content') ||
    $(`meta[property="twitter:${name}"]`).attr('content');

  const getScriptData = (name: string) => {
    const script = [...$('script')].find((e) => $(e).text().includes(`"${name}":`));
    return script ? JSON.parse($(script).text())[0][name] : '';
  };

  return {
    source: getBlogSource(url),
    title: getMeta('title') || $('title').text() || '',
    description: getMeta('description') || '',
    image: getMeta('image') || '',
    url,
    publishedAt: new Date(getScriptData('datePublished')).toISOString(),
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

const extractThumbnailFromMedium = (html: string): string => {
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

const formatMediumPost = (post: MediumBlog): Blog => {
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
        stripHtml(post.content, {
          ignoreTagsWithTheirContents: ['figure', 'img'],
          stripTogetherWithTheirContents: ['script', 'style', 'xml', 'p'],
        })
          .result.replace('\n', '')
          .trim(),
      ),
    url: post.guid,
    tags: post.categories,
    publishedAt: new Date(post.pubDate).toISOString(),
    source: 'Medium',
  };
};

const getMediumPost = async (user: string): Promise<Blog[]> => {
  try {
    if (!user) return [];

    const response = await request(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${user}`);

    return response.items.map((item: any) => formatMediumPost(item));
  } catch (_error) {
    return [];
  }
};

export { getBlogSource, scrapeWebsite, getMediumPost };
