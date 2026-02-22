import footer from '@/data/collections/footer.json';
import socials from '@/data/collections/socials.json';
import { heroSection } from '@/data/page-data/home-page.json';
import type { Social } from '@/types/portfolio-types';
import FooterClient from './client/footer-client';
import { ImageBox } from './image-box';

export default function Footer() {
  if (!footer) {
    return null;
  }

  const userName = heroSection?.name || 'Wasiq Bhamla';
  const lightLogo = footer.logo.lightLogo;
  const darkLogo = footer.logo.darkLogo;

  return (
    <FooterClient
      footer={footer}
      socials={socials as Social[]}
      userName={userName}
      darkImage={<ImageBox imageUrl={darkLogo} alt={'Logo'} priority imageClassName='h-10 w-10 object-contain' />}
      lightImage={<ImageBox imageUrl={lightLogo} alt={'Logo'} priority imageClassName='h-10 w-10 object-contain' />}
    />
  );
}
