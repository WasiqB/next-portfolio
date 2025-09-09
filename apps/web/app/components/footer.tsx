'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import { getSocialIcon } from '@/app/lib/social-utils';
import { HeroData } from '@/app/types/portfolio-types';
import { useVariableValue } from '@wb/feature-toggle/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const heroData: HeroData = portfolioData.hero;
  const { theme } = useTheme();
  const showProducts = useVariableValue('show-products', false);
  const showGrowth = useVariableValue('show-growth', false);

  // Define the navigation structure (same as navbar)
  const navigationItems = [
    { name: 'Home', href: '/', submenu: false },
    {
      name: 'About',
      href: '#',
      submenu: true,
      items: [
        { name: 'About Me', href: '/about', visible: true },
        { name: 'My Growth', href: '/#growth', visible: !!showGrowth },
        { name: 'Testimonials', href: '/#testimonials', visible: true },
      ],
    },
    {
      name: 'Work',
      href: '#',
      submenu: true,
      items: [
        { name: 'Projects', href: '/#projects', visible: true },
        { name: 'Services', href: '/#services', visible: true },
        { name: 'Products', href: '/#products', visible: !!showProducts },
        { name: 'Sponsors', href: '/#sponsors', visible: true },
      ],
    },
    {
      name: 'Resources',
      href: '#',
      submenu: true,
      items: [
        { name: 'Blogs', href: '/#blogs', visible: true },
        { name: 'Videos', href: '/#videos', visible: true },
      ],
    },
    {
      name: 'Contact Me',
      href: '/#contact',
      submenu: false,
      visible: true,
    },
  ];

  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto max-w-[90rem] px-6 py-8 sm:px-8 md:px-12 md:py-12 lg:px-16'>
        {/* Mobile layout: logo/socials on top, nav sections in 2 cols below */}
        <div className='block lg:hidden'>
          {/* Logo and socials */}
          <div className='mb-8 flex flex-col items-center space-y-4'>
            <div className='flex items-center gap-2'>
              {theme === 'dark' ? (
                <Image
                  src='/images/logo/dark-logo.png'
                  alt='Logo'
                  width={40}
                  height={40}
                  priority
                  className='h-10 w-10 object-contain'
                />
              ) : (
                <Image
                  src='/images/logo/light-logo.png'
                  alt='Logo'
                  width={40}
                  height={40}
                  priority
                  className='h-10 w-10 object-contain'
                />
              )}
            </div>
            <p className='text-muted-foreground text-center'>
              Follow me on my Socials
            </p>
            <div className='flex items-center justify-center gap-4'>
              {heroData.socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.ariaLabel}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
          {/* Nav sections in 2 columns */}
          <div className='grid grid-cols-2 gap-6'>
            {navigationItems
              .filter((item) => item.submenu)
              .map((category) => (
                <div key={category.name} className='space-y-4'>
                  <h3 className='text-lg font-bold'>{category.name}</h3>
                  <nav className='flex flex-col space-y-2'>
                    {category.items
                      ?.filter((item) => item.visible)
                      .map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className='text-muted-foreground hover:text-primary transition-colors'
                        >
                          {item.name}
                        </Link>
                      ))}
                  </nav>
                </div>
              ))}
          </div>
        </div>
        {/* Desktop/tablet layout: original 4 columns */}
        <div className='hidden grid-cols-4 gap-8 lg:grid'>
          {/* About section */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              {theme === 'dark' ? (
                <Image
                  src='/images/logo/dark-logo.png'
                  alt='Logo'
                  width={40}
                  height={40}
                  priority
                  className='h-10 w-10 object-contain'
                />
              ) : (
                <Image
                  src='/images/logo/light-logo.png'
                  alt='Logo'
                  width={40}
                  height={40}
                  priority
                  className='h-10 w-10 object-contain'
                />
              )}
            </div>
            <p className='text-muted-foreground'>Follow me on my Socials</p>
            <div className='flex items-center gap-4'>
              {heroData.socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.ariaLabel}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
          {/* Navigation sections */}
          {navigationItems
            .filter((item) => item.submenu)
            .map((category) => (
              <div key={category.name} className='space-y-4'>
                <h3 className='text-lg font-bold'>{category.name}</h3>
                <nav className='flex flex-col space-y-2'>
                  {category.items
                    ?.filter((item) => item.visible)
                    .map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className='text-muted-foreground hover:text-primary transition-colors'
                      >
                        {item.name}
                      </Link>
                    ))}
                </nav>
              </div>
            ))}
        </div>
        <div className='text-muted-foreground mt-8 border-t pt-8 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} {heroData.name}. Build with ❤️
            from 🇮🇳.
            <br /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
