import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import TestimonialContent from '@/components/pages/testimonial-content';
import TestimonialsSkeleton from '@/components/skeletons/testimonials-skeleton';
import socialLinks from '@/data/collections/socials.json';
import testimonials from '@/data/collections/testimonials.json';
import { heroSection } from '@/data/page-data/home-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import testimonialsPage from '@/data/page-data/testimonial-page.json';
import { domain } from '@/lib/constants';
import type { Testimonial } from '@/types/portfolio-types';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!testimonialsPage) return {};

  const { title, description, seo } = testimonialsPage;
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
      url: `${domain}/testimonials`,
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
      canonical: `${domain}/testimonials`,
    },
  };
};

async function TestimonialData() {
  const name = heroSection.name || 'Wasiq Bhamla';

  const testimonialsWithImages = testimonials.map((testimonial, index) => ({
    ...testimonial,
    imageNode: (
      <ImageBox
        imageUrl={testimonial.avatar}
        imageClassName='object-cover'
        priority={index < 4}
        fill
        alt={testimonial.name}
      />
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
      <TestimonialContent testimonials={testimonialsWithImages as (Testimonial & { imageNode?: React.ReactNode })[]} />
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
