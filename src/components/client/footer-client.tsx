'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getSocialIcon } from '@/components/social-icons';
import { smoothScrollTo } from '@/lib/utils';
import type { Footer, Social } from '@/types/portfolio-types';

interface FooterClientProps {
  footer: Footer;
  socials: Social[];
  userName: string;
  lightImage: React.ReactNode;
  darkImage: React.ReactNode;
}

export default function FooterClient({ footer, socials, userName, lightImage, darkImage }: FooterClientProps) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <footer className='border-t bg-background'>
      <div className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Logo and socials */}
          <div className='space-y-4 flex flex-col items-center lg:items-start'>
            <div className='flex items-center gap-2'>{theme === 'dark' ? darkImage : lightImage}</div>
            <p className='text-muted-foreground text-center lg:text-left'>{footer.socialSection.title}</p>
            <div className='flex items-center gap-4 justify-center lg:justify-start'>
              {socials.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.label}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          <div className='grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8'>
            {footer.categories?.map((category) => (
              <div key={category.title} className='space-y-4'>
                <h3 className='text-lg font-bold text-center lg:text-left'>{category.title}</h3>
                <nav className='flex flex-col space-y-2 items-center lg:items-start'>
                  {category.items
                    ?.filter((item) => item.visible)
                    .map((item) => (
                      <Link
                        key={item.label}
                        href={item.url}
                        className='text-muted-foreground hover:text-primary transition-colors text-sm'
                        onClick={smoothScrollTo}
                      >
                        {item.label}
                      </Link>
                    ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 pt-8 border-t text-left text-sm text-muted-foreground'>
          <p className='whitespace-pre-line'>
            &copy; {new Date().getFullYear()}, {userName}.
            <br />
            {footer.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
