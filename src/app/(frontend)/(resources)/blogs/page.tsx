import type { Metadata } from 'next';
import { fetchBlogs } from '@/components/blogs';
import { ImageBox } from '@/components/image-box';
import BlogsContent from '@/components/pages/blogs-content';
import blogSources from '@/data/collections/blogs.json';
import socialLinks from '@/data/collections/socials.json';
import blogsPage from '@/data/page-data/blogs-page.json';
import { heroSection } from '@/data/page-data/home-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import { domain } from '@/lib/constants';
import type { BlogSource } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!blogsPage) return {};

  const { title, description, seo } = blogsPage;
  const name = heroSection.name;
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
      siteName: siteSettings?.name || name,
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
  const blogs = await fetchBlogs(blogSources as BlogSource[]);

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
  return <BlogsData />;
}
