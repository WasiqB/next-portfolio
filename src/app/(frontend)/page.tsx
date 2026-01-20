import type { Metadata } from 'next';
import Blogs from '@/components/blogs';
import { ConditionalSection } from '@/components/conditional-section';
import Contact from '@/components/contact';
import GrowthSection from '@/components/growth-section';
import Hero from '@/components/hero';
import Products from '@/components/products';
import Projects from '@/components/projects';
import Services from '@/components/services';
import SponsorsSection from '@/components/sponsors-section';
import Testimonials from '@/components/testimonials';
import Videos from '@/components/videos';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage as HomePageType, Media, SiteSetting, Social } from '@/payload/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [homePage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<HomePageType>('homePage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!homePage) return {};

  const { name, bio, profileImage } = homePage.heroSection;
  const image = profileImage?.[0]?.src as Media;
  const imageUrl = image?.url;
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
    keywords: homePage.seo?.keywords || [],
    openGraph: {
      title: name,
      description: bio,
      url: domain,
      siteName: siteSettings?.siteName || name,
      images: [
        {
          url: imageUrl || '',
          width: 400,
          height: 400,
          alt: profileImage?.[0]?.alt || name,
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
      images: [imageUrl || ''],
    },
    alternates: {
      canonical: domain,
    },
  };
};

export default async function Home() {
  const [homePage, socialLinks] = await Promise.all([
    getGlobalConfig<HomePageType>('homePage'),
    getCollectionData<Social[]>('socials'),
  ]);

  const jsonLd = homePage
    ? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: homePage.heroSection.name,
        url: domain,
        image: (homePage.heroSection.profileImage?.[0]?.src as Media)?.url,
        sameAs: socialLinks?.map((link) => link.url) || [],
        jobTitle: homePage.heroSection.name,
        description: homePage.heroSection.bio,
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
      <Hero />
      <Projects />
      <Services />
      <ConditionalSection variableKey='show-products' defaultValue={false}>
        <Products />
      </ConditionalSection>
      <Blogs />
      <Videos />
      <ConditionalSection variableKey='show-growth' defaultValue={false}>
        <GrowthSection />
      </ConditionalSection>
      <Testimonials />
      <SponsorsSection />
      <Contact />
    </main>
  );
}
