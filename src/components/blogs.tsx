import { Suspense } from 'react';
import { appProtocol, domain } from '@/lib/constants';
import { fetchWithBypass } from '@/lib/fetch-utils';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getHomePage } from '@/payload/fetchers/globals';
import type { BlogSource } from '@/payload/types';
import type { Blog } from '@/types/portfolio-types';
import BlogsClient from './client/blogs-client';
import { SectionError } from './client/section-error';
import BlogsSkeleton from './skeletons/blogs-skeleton';

async function fetchBlogs(sources: BlogSource[]): Promise<Blog[]> {
  try {
    const blogsApiUrl = `${appProtocol}://${domain}/api/blogs`;
    const blogs = sources.map(async ({ source, username, url }) => {
      if (source === 'medium' && username) {
        const apiUrl = `${blogsApiUrl}?username=${username}`;
        console.info(`Fetching Medium blogs for ${username} from ${apiUrl}`);
        const response = await fetchWithBypass(apiUrl);

        if (!response.ok) {
          console.error(`Error fetching Medium blogs for ${username}`);
          console.error(`Response status: ${response.status}`);
          console.error(`Response Body: ${await response.text()}`);
          return [];
        }

        const mediumBlogs = (await response.json()) as Blog[];
        return mediumBlogs;
      } else if (source === 'custom' && url) {
        const apiUrl = `${blogsApiUrl}?url=${url}`;
        console.info(`Fetching custom blog from ${apiUrl}`);
        const response = await fetchWithBypass(apiUrl);

        if (!response.ok) {
          console.error(`Error fetching custom blog from ${url}`);
          console.error(`Response status: ${response.status}`);
          console.error(`Response Body: ${await response.text()}`);
          return [];
        }

        return Array.of((await response.json()) as Blog);
      }
      return [];
    });
    return (await Promise.all(blogs)).flat().filter(Boolean);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
  return [];
}

export default async function Blogs() {
  const data = await getHomePage();
  const blogSection = data?.blogSection;
  const blogSources = await getCollectionData<BlogSource[]>('blog-sources');

  const blogData = await fetchBlogs(blogSources);

  if (!blogSection || !blogData || blogData.length === 0) {
    return (
      <section id='blogs' className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <SectionError title='Blog section Unavailable' message='Failed to load blog section data' />
      </section>
    );
  }

  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsClient blogSection={blogSection} blogData={blogData} />
    </Suspense>
  );
}
