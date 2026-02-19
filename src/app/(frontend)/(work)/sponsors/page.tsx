import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ImageBox } from '@/components/image-box';
import SponsorContent from '@/components/pages/sponsor-content';
import SponsorsSkeleton from '@/components/skeletons/sponsors-skeleton';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type {
  HomePage,
  Media,
  SiteSetting,
  Social,
  Sponsor,
  SponsorsPage as SponsorsPageType,
  SponsorTier,
} from '@/payload/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [sponsorsPage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<SponsorsPageType>('sponsorsPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!sponsorsPage) return {};

  const { title, description, seo } = sponsorsPage;
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
      url: `${domain}/sponsors`,
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
      canonical: `${domain}/sponsors`,
    },
  };
};

async function SponsorData() {
  const [sponsors, tiers, sponsorsPage] = await Promise.all([
    getCollectionData<Sponsor[]>('sponsors'),
    getCollectionData<SponsorTier[]>('sponsor-tiers'),
    getGlobalConfig<SponsorsPageType>('sponsorsPage'),
  ]);

  const sponsorsWithImages = sponsors.map((sponsor) => ({
    ...sponsor,
    imageNode: (
      <ImageBox
        media={sponsor.avatar as Media}
        imageClassName='object-cover transition-transform group-hover:scale-105'
        fill
        priority
        alt={sponsor.name}
      />
    ),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: sponsorsPage?.title || 'Our Sponsors',
    description: sponsorsPage?.description,
    numberOfItems: sponsors.length,
    itemListElement: sponsors.map((sponsor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: sponsor.name,
        image: (sponsor.avatar as Media)?.url,
        url: sponsor.url,
      },
    })),
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <SponsorContent sponsors={sponsorsWithImages} tiers={tiers} />
    </>
  );
}

export default function SponsorsPage() {
  return (
    <Suspense fallback={<SponsorsSkeleton />}>
      <SponsorData />
    </Suspense>
  );
}
