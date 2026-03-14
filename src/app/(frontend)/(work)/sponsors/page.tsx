import type { Metadata } from 'next';
import { ImageBox } from '@/components/image-box';
import SponsorContent from '@/components/pages/sponsor-content';
import socialLinks from '@/data/collections/socials.json';
import sponsorTiers from '@/data/collections/sponsor-tiers.json';
import sponsors from '@/data/collections/sponsors.json';
import { heroSection } from '@/data/page-data/home-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import sponsorsPage from '@/data/page-data/sponsor-page.json';
import { domain } from '@/lib/constants';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!sponsorsPage) return {};

  const { title, description, seo } = sponsorsPage;
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
      url: `${domain}/sponsors`,
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
      canonical: `${domain}/sponsors`,
    },
  };
};

async function SponsorData() {
  const sponsorsWithImages = sponsors.map((sponsor, index) => ({
    ...sponsor,
    imageNode: (
      <ImageBox
        imageUrl={sponsor.avatar}
        imageClassName='object-cover transition-transform group-hover:scale-105'
        fill
        priority={index < 4}
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
        image: sponsor.avatar,
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
      <SponsorContent sponsors={sponsorsWithImages} tiers={sponsorTiers} />
    </>
  );
}

export default function SponsorsPage() {
  return <SponsorData />;
}
