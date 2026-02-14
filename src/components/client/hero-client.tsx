'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { getSocialIcon } from '@/components/social-icons';
import { Button } from '@/components/ui/button';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { smoothScrollTo } from '@/lib/utils';
import type { HomePage, Social } from '@/payload/types';

interface HeroClientProps {
  heroSection: HomePage['heroSection'];
  socials: Social[];
  profileImage: React.ReactNode;
}

export default function HeroClient({ heroSection, socials, profileImage }: HeroClientProps) {
  return (
    <section id='heroSection' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 lg:py-32'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        <div className='space-y-6 order-2 md:order-1'>
          <motion.h1
            className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {heroSection?.name}
          </motion.h1>
          <div className='h-12'>
            <TypingAnimation
              words={heroSection?.typingTexts}
              pauseDelay={heroSection?.typingDelay || 2000}
              cursorStyle='block'
              className='text-xl md:text-2xl text-muted-foreground'
              loop
            />
          </div>

          <motion.p
            className='text-lg text-muted-foreground max-w-prose'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heroSection?.bio}
          </motion.p>

          <motion.div
            className='flex flex-wrap gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild>
              <Link
                href={heroSection?.primary?.[0]?.url || ''}
                target={heroSection?.primary?.[0]?.target || '_self'}
                onClick={smoothScrollTo}
              >
                {heroSection?.primary?.[0]?.label}
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link
                href={heroSection?.secondary?.[0]?.url || ''}
                target={heroSection?.secondary?.[0]?.target || '_self'}
                onClick={smoothScrollTo}
              >
                {heroSection?.secondary?.[0]?.label}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className='flex items-center gap-4 pt-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {socials.map((social, index) => (
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
          </motion.div>
        </div>

        <motion.div
          className='flex justify-center order-1 md:order-2 mb-8 md:mb-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary mx-auto'>
            {profileImage}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
