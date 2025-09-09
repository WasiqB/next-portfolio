'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import { getSocialIcon } from '@/app/lib/social-utils';
import { HeroData } from '@/app/types/portfolio-types';
import { Button } from '@wb/ui/components/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroData: HeroData = portfolioData.hero;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className='mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-32'>
      <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2'>
        <div className='order-2 space-y-6 md:order-1'>
          <motion.h1
            className='text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {heroData.name}
          </motion.h1>

          <div className='h-12'>
            <TypeAnimation
              sequence={heroData.typingSequences}
              wrapper='h2'
              speed={50}
              className='text-muted-foreground text-xl md:text-2xl'
              repeat={Number.POSITIVE_INFINITY}
            />
          </div>

          <motion.p
            className='text-muted-foreground max-w-prose text-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heroData.bio}
          </motion.p>

          <motion.div
            className='flex flex-wrap gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild>
              <Link href={heroData.buttons.primary.href}>
                {heroData.buttons.primary.text}
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href={heroData.buttons.secondary.href}>
                {heroData.buttons.secondary.text}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className='flex items-center gap-4 pt-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
          </motion.div>
        </div>

        <motion.div
          className='order-1 mb-8 flex justify-center md:order-2 md:mb-0'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='border-primary relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 sm:h-64 sm:w-64 md:h-80 md:w-80'>
            <Image
              src={heroData.profileImage.src}
              alt={heroData.profileImage.alt}
              fill
              className='object-cover'
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
