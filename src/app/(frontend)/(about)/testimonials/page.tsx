import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import TestimonialContent from '@/components/pages/testimonial-content';
import TestimonialsSkeleton from '@/components/skeletons/testimonials-skeleton';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type {
  HomePage,
  Media,
  SiteSetting,
  Social,
  Testimonial,
  TestimonialsPage as TestimonialsPageType,
} from '@/payload/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [testimonialsPage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<TestimonialsPageType>('testimonialsPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!testimonialsPage) return {};

  const { title, description, seo } = testimonialsPage;
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
      url: `${domain}/testimonials`,
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
      canonical: `${domain}/testimonials`,
    },
  };
};

async function TestimonialData() {
  const [testimonials, testimonialsPage, homePage] = await Promise.all([
    getCollectionData<Testimonial[]>('testimonials'),
    getGlobalConfig<TestimonialsPageType>('testimonialsPage'),
    getGlobalConfig<HomePage>('homePage'),
  ]);

  const name = homePage?.heroSection.name || 'Wasiq Bhamla';

  const testimonialsWithImages = testimonials.map((testimonial) => ({
    ...testimonial,
    imageNode: (
      <ImageBox media={testimonial.image as Media} imageClassName='object-cover' priority fill alt={testimonial.name} />
    ),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: testimonialsPage?.title || 'Testimonials',
    description: testimonialsPage?.description,
    url: `${domain}/testimonials`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: testimonials.map((testimonial, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: testimonial.name,
          },
          reviewBody: testimonial.testimonial,
          itemReviewed: {
            '@type': 'Person',
            name: name,
          },
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
      <TestimonialContent testimonials={testimonialsWithImages} />
    </>
  );
}

export default function TestimonialsPage() {
  return (
    <Suspense fallback={<TestimonialsSkeleton />}>
      <TestimonialData />
    </Suspense>
  );
}
