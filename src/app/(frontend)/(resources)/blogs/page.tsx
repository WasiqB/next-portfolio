import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchBlogs } from '@/components/blogs';
import { ImageBox } from '@/components/image-box';
import BlogsContent from '@/components/pages/blogs-content';
import BlogsSkeleton from '@/components/skeletons/blogs-skeleton';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { BlogSource, BlogsPage as BlogsPageType, HomePage, SiteSetting, Social } from '@/payload/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [blogsPage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<BlogsPageType>('blogsPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!blogsPage) return {};

  const { title, description, seo } = blogsPage;
  const homePage = await getGlobalConfig<HomePage>('homePage');
  const name = homePage?.heroSection.name;
  const twitterHandle = socialLinks
    ?.find((link) => link.platform === 'x')
    ?.url.split('/')
    .pop();

  return {
    title: {
      absolute: `${title} | ${name}`,
      template: siteSettings?.titleTemplate || `%s | ${name}`,
    },
    description,
    keywords: seo?.keywords || [],
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: `${domain}/blogs`,
      siteName: siteSettings?.siteName || name,
      locale: siteSettings?.defaultLanguage || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${name}`,
      description,
      creator: `@${twitterHandle}`,
    },
    alternates: {
      canonical: `${domain}/blogs`,
    },
  };
};

async function BlogsData() {
  const blogsPage = await getGlobalConfig<BlogsPageType>('blogsPage');
  const blogSources = await getCollectionData<BlogSource[]>('blog-sources');
  const blogs = await fetchBlogs(blogSources);

  const blogsWithImages = blogs.map((blog) => ({
    ...blog,
    imageNode: <ImageBox imageUrl={blog.image} imageClassName='object-cover' fill priority alt={blog.title} />,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: blogsPage?.title || 'Blogs',
    description: blogsPage?.description,
    url: `${domain}/blogs`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.description,
          image: blog.image,
          url: blog.url,
          datePublished: blog.publishedAt,
        },
      })),
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <BlogsContent blogs={blogsWithImages} />
    </>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsData />
    </Suspense>
  );
}
