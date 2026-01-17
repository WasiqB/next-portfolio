import type { Metadata } from 'next';
import { Suspense } from 'react';
import ServiceContent from '@/components/pages/services-content';
import ServicesSkeleton from '@/components/skeletons/services-skeleton';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Service } from '@/payload/types';

export const metadata: Metadata = {
  title: 'My Services',
  description: 'My freelancing services for different aspects of automation',
};

async function ServicesData() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const serviceSection = data?.serviceSection;
  const services = await getCollectionData<Service[]>('services');

  if (!serviceSection || !services) {
    return null;
  }

  return (
    <ServiceContent
      sectionTitle={serviceSection.title}
      sectionDescription={serviceSection.description}
      bookCallButton={serviceSection.bookCallButton}
      services={services}
    />
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesData />
    </Suspense>
  );
}
