import type { Metadata } from 'next';
import { Suspense } from 'react';
import Blogs from '@/components/blogs';
import Contact from '@/components/contact';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Services from '@/components/services';
import BlogsSkeleton from '@/components/skeletons/blogs-skeleton';
import ContactSkeleton from '@/components/skeletons/contact-skeleton';
import HeroSkeleton from '@/components/skeletons/hero-skeleton';
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton';
import ServicesSkeleton from '@/components/skeletons/services-skeleton';
import SponsorsSkeleton from '@/components/skeletons/sponsors-skeleton';
import TestimonialsSkeleton from '@/components/skeletons/testimonials-skeleton';
import VideosSkeleton from '@/components/skeletons/videos-skeleton';
import SponsorsSection from '@/components/sponsors-section';
import Testimonials from '@/components/testimonials';
import Videos from '@/components/videos';
import socialLinks from '@/data/collections/socials.json';
import { heroSection, seo } from '@/data/page-data/home-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import { domain } from '@/lib/constants';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!heroSection) return {};

  const { name, bio, image } = heroSection;
  const twitterHandle = socialLinks
    ?.find((link) => link.platform === 'x')
    ?.url.split('/')
    .pop();

  return {
    title: {
      default: name,
      template: siteSettings?.titleTemplate || `%s | ${name}`,
    },
    description: bio,
    keywords: seo?.keywords || [],
    openGraph: {
      title: name,
      description: bio,
      url: domain,
      siteName: siteSettings?.name || name,
      images: [
        {
          url: image || '',
          width: 400,
          height: 400,
          alt: name,
          type: 'image/jpeg',
        },
      ],
      locale: siteSettings?.defaultLanguage || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: bio,
      creator: `@${twitterHandle}`,
      images: [image],
    },
    alternates: {
      canonical: domain,
    },
  };
};

export default async function Home() {
  const jsonLd = heroSection
    ? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: heroSection.name,
        url: domain,
        image: heroSection.image,
        sameAs: socialLinks?.map((link) => link.url) || [],
        jobTitle: heroSection.name,
        description: heroSection.bio,
      }
    : null;

  return (
    <main className='min-h-screen'>
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton isSection />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton isSection />}>
        <Services />
      </Suspense>
      <Suspense fallback={<BlogsSkeleton isSection />}>
        <Blogs />
      </Suspense>
      <Suspense fallback={<VideosSkeleton isSection />}>
        <Videos />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton isSection />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SponsorsSkeleton isSection />}>
        <SponsorsSection />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <Contact />
      </Suspense>
    </main>
  );
}
