import { getGlobalConfig } from '@/payload/fetchers/globals';
import type { Navbar as NavbarType } from '@/payload/types';
import NavbarClient from './client/navbar-client';

export default async function Navbar() {
  const navbar = await getGlobalConfig<NavbarType>('navbar');

  if (!navbar) {
    return null;
  }

  return <NavbarClient navbar={navbar} />;
}
