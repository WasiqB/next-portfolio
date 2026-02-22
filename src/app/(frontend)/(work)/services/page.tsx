import type { Metadata } from 'next';
import { Suspense } from 'react';
import ServiceContent from '@/components/pages/services-content';
import ServicesSkeleton from '@/components/skeletons/services-skeleton';
import services from '@/data/collections/services.json';
import socialLinks from '@/data/collections/socials.json';
import { heroSection, serviceSection } from '@/data/page-data/home-page.json';
import servicesPage from '@/data/page-data/service-page.json';
import siteSettings from '@/data/page-data/site-setting.json';
import { domain } from '@/lib/constants';

export const generateMetadata = async (): Promise<Metadata> => {
  if (!servicesPage) return {};

  const { title, description, seo } = servicesPage;
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
      url: `${domain}/services`,
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
      canonical: `${domain}/services`,
    },
  };
};

async function ServicesData() {
  if (!serviceSection || !services) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceSection.title,
    description: serviceSection.description,
    provider: {
      '@type': 'Person',
      name: heroSection.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Catalog',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
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
      <ServiceContent
        sectionTitle={serviceSection.title}
        sectionDescription={serviceSection.description}
        bookCallButton={serviceSection.bookACallButton}
        services={services}
      />
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesData />
    </Suspense>
  );
}
