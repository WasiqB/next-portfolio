import { Suspense } from 'react';
import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { HomePage, Service } from '@/payload/types';
import { SectionError } from './client/section-error';
import ServicesClient from './client/services-client';
import ServicesSkeleton from './skeletons/services-skeleton';

export default async function Services() {
  const data = await getGlobalConfig<HomePage>('homePage');
  const serviceSection = data?.serviceSection;
  const services = await getCollectionData<Service[]>('services');

  if (!serviceSection || !services) {
    return (
      <section id='services' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 bg-muted/50'>
        <SectionError title='Service section Unavailable' message='Failed to load service section data' />
      </section>
    );
  }

  return (
    <Suspense fallback={<ServicesSkeleton isSection />}>
      <ServicesClient serviceSection={serviceSection} services={services} />
    </Suspense>
  );
}
