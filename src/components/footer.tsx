import { getCollectionData } from '@/payload/fetchers/collections';
import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { Footer as FooterType, HomePage, Social } from '@/payload/types';
import FooterClient from './client/footer-client';

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

  return <FooterClient footer={footer} socials={socials || []} userName={userName} />;
}
