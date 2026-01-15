import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchBlogs } from '@/components/blogs';
import { ImageBox } from '@/components/image-box';
import BlogsContent from '@/components/pages/blogs-content';
import BlogsSkeleton from '@/components/skeletons/blogs-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { BlogSource, HomePage } from '@/payload/types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalConfig<HomePage>('homePage');
  const blogSection = data?.blogSection;

  const title = `${blogSection?.title || 'My Blogs'} | Wasiq Bhamla`;
  const description =
    blogSection?.description || 'Check out my latest articles and insights on various testing related topics.';

  return {
    title,
    description,
    keywords: [
      'Quality Assurance',
      'Testing',
      'Automation',
      'Selenium',
      'Appium',
      'Boyka Framework',
      'Technical Blogs',
      'Wasiq Bhamla',
      'Software Testing',
      'SDET',
    ],
    openGraph: {
      title,
      description,
      url: 'https://wasiqbhamla.com/blogs',
      siteName: 'Wasiq Bhamla - Portfolio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WasiqBhamla',
      creator: '@WasiqBhamla',
      title,
      description,
    },
    alternates: {
      canonical: 'https://wasiqbhamla.com/blogs',
    },
  };
}

async function BlogsData() {
  const blogSources = await getCollectionData<BlogSource[]>('blog-sources');
  const blogs = await fetchBlogs(blogSources);

  const blogsWithImages = blogs.map((blog) => ({
    ...blog,
    imageNode: (
      <ImageBox
        imageUrl={blog.image || 'https://placehold.net/600x600.png'}
        imageClassName='object-cover'
        fill
        alt={blog.title}
      />
    ),
  }));

  return <BlogsContent blogs={blogsWithImages} />;
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsData />
    </Suspense>
  );
}
