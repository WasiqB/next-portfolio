import contactSection from '@/data/page-data/contact-page.json';
import ContactClient from './client/contact-client';
import { SectionError } from './client/section-error';

export default function Contact() {
  if (!contactSection) {
    return (
      <section id='contact' className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
        <SectionError title='Contact section Unavailable' message='Failed to load contact section data' />
      </section>
    );
  }

  return <ContactClient contactSection={contactSection} />;
}
