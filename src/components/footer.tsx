import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { Footer as FooterType, HomePage, Media, Social } from '@/payload/types';
import FooterClient from './client/footer-client';
import { ImageBox } from './image-box';

export default async function Footer() {
  const [footer, homePage, socials] = await Promise.all([
    getGlobalConfig<FooterType>('footer'),
    getGlobalConfig<HomePage>('homePage'),
    getCollectionData<Social[]>('socials'),
  ]);

  if (!footer) {
    return null;
  }

  const userName = homePage?.heroSection?.name || 'Wasiq Bhamla';
  const lightLogo = footer.logo.lightLogo as Media;
  const darkLogo = footer.logo.darkLogo as Media;

  return (
    <FooterClient
      footer={footer}
      socials={socials || []}
      userName={userName}
      darkImage={
        <ImageBox media={darkLogo} alt={darkLogo.alt || 'Logo'} priority imageClassName='h-10 w-10 object-contain' />
      }
      lightImage={
        <ImageBox media={lightLogo} alt={lightLogo.alt || 'Logo'} priority imageClassName='h-10 w-10 object-contain' />
      }
    />
  );
}
