import header from '@/data/collections/header.json';
import type { Header } from '@/types/portfolio-types';
import NavbarClient from './client/navbar-client';
import { ImageBox } from './image-box';

export default function Navbar() {
  if (!header) {
    return null;
  }

  const lightLogo = header.logo.lightLogo;
  const darkLogo = header.logo.darkLogo;

  return (
    <NavbarClient
      navbar={header as Header}
      lightImage={<ImageBox imageUrl={lightLogo} alt={'Logo'} priority imageClassName='h-10 w-10 object-contain' />}
      darkImage={<ImageBox imageUrl={darkLogo} alt={'Logo'} priority imageClassName='h-10 w-10 object-contain' />}
    />
  );
}
