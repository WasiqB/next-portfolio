'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import type { SponsorsData, SponsorTier } from '@/app/types/portfolio-types';
import { Button } from '@wb/ui/components/button';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SponsorsSection() {
  const sponsors: SponsorsData = portfolioData.sponsors;
  const sponsorTiers: SponsorTier[] = sponsors.tiers;
  const tierOrder = sponsorTiers.map((tier) => tier.slug);

  // Sort sponsors by tier priority
  const sortedSponsors = sponsors.sponsors.slice().sort((a, b) => {
    const aIdx = tierOrder.indexOf(a.tier);
    const bIdx = tierOrder.indexOf(b.tier);
    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });
  const topSponsors = sortedSponsors.slice(0, 4);

  return (
    <section
      id='sponsors'
      className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 space-y-4 text-center'
      >
        <h2 className='text-3xl font-bold md:text-4xl'>
          {portfolioData.sponsors.sectionTitle}
        </h2>
        {portfolioData.sponsors.sectionDescription && (
          <p className='text-muted-foreground mx-auto max-w-2xl'>
            {portfolioData.sponsors.sectionDescription}
          </p>
        )}
      </motion.div>

      <div className='mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'>
        {topSponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='flex justify-center'
          >
            <Link
              href={sponsor.profileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='group'
            >
              <div className='border-muted hover:border-primary relative h-24 w-24 overflow-hidden rounded-full border-2 transition-all md:h-32 md:w-32'>
                <Image
                  src={sponsor.avatarUrl || '/placeholder.svg'}
                  alt={sponsor.name}
                  fill
                  className='object-cover transition-transform group-hover:scale-105'
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className='flex justify-center'>
        <Button asChild>
          <Link href='/sponsors'>
            <Heart className='mr-2 h-4 w-4' />
            Become a Sponsor
          </Link>
        </Button>
      </div>
    </section>
  );
}
