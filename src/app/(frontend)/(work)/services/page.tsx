import type { Metadata } from 'next';
import { Suspense } from 'react';
import ServiceContent from '@/components/pages/services-content';
import ServicesSkeleton from '@/components/skeletons/services-skeleton';
import { domain } from '@/lib/constants';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Service, ServicesPage as ServicesPageType, SiteSetting, Social } from '@/payload/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [servicesPage, socialLinks, siteSettings] = await Promise.all([
    getGlobalConfig<ServicesPageType>('servicesPage'),
    getCollectionData<Social[]>('socials'),
    getGlobalConfig<SiteSetting>('siteSettings'),
  ]);

  if (!servicesPage) return {};

  const { title, description, seo } = servicesPage;
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
      url: `${domain}/services`,
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
      canonical: `${domain}/services`,
    },
  };
};

async function ServicesData() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const serviceSection = data?.serviceSection;
  const services = await getCollectionData<Service[]>('services');

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
      name: data?.heroSection.name,
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
        bookCallButton={serviceSection.bookCallButton}
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
