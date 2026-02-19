import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { Media, Navbar as NavbarType } from '@/payload/types';
import NavbarClient from './client/navbar-client';
import { ImageBox } from './image-box';

export default async function Navbar() {
  const navbar = await getGlobalConfig<NavbarType>('navbar');

  if (!navbar) {
    return null;
  }

  const lightLogo = navbar.logo.lightLogo as Media;
  const darkLogo = navbar.logo.darkLogo as Media;

  return (
    <NavbarClient
      navbar={navbar}
      lightImage={
        <ImageBox media={lightLogo} alt={lightLogo.alt || 'Logo'} priority imageClassName='h-10 w-10 object-contain' />
      }
      darkImage={
        <ImageBox media={darkLogo} alt={darkLogo.alt || 'Logo'} priority imageClassName='h-10 w-10 object-contain' />
      }
    />
  );
}
