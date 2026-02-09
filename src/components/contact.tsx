import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { ContactSection } from '@/payload/types';
import ContactClient from './client/contact-client';
import { SectionError } from './client/section-error';

export default async function Contact() {
  const contactSection = await getGlobalConfig<ContactSection>('contactSection');

  if (!contactSection) {
    return (
      <section id='contact' className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <SectionError title='Contact section Unavailable' message='Failed to load contact section data' />
      </section>
    );
  }

  return <ContactClient contactSection={contactSection} />;
}
