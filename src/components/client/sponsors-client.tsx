'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HomePage, Media, Sponsor, SponsorTier } from '@/payload/types';

interface SponsorsClientProps {
  sponsorSection: HomePage['sponsorSection'];
  sponsors: Sponsor[];
  tiers: SponsorTier[];
}

export default function SponsorsClient({ sponsorSection, sponsors, tiers }: SponsorsClientProps) {
  const tierOrder = tiers.sort((a, b) => b.price - a.price).map((tier) => tier.slug);

  // Sort sponsors by tier priority
  const sortedSponsors = [...sponsors].sort((a, b) => {
    const aTier = typeof a.tier === 'object' ? a.tier.slug : '';
    const bTier = typeof b.tier === 'object' ? b.tier.slug : '';

    const aIdx = tierOrder.indexOf(aTier);
    const bIdx = tierOrder.indexOf(bTier);

    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  const topSponsors = sortedSponsors.slice(0, 4);

  return (
    <section id='sponsors' className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-12'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>{sponsorSection.title}</h2>
        {sponsorSection.description && (
          <p className='text-muted-foreground max-w-2xl mx-auto'>{sponsorSection.description}</p>
        )}
      </motion.div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto mb-12'>
        {topSponsors.map((sponsor, index) => {
          const avatarUrl = typeof sponsor.avatar === 'object' ? (sponsor.avatar as Media).url : '';
          return (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='flex justify-center'
            >
              <Link href={sponsor.url} target='_blank' rel='noopener noreferrer' className='group'>
                <div className='relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-muted transition-all hover:border-primary'>
                  <Image
                    src={avatarUrl || '/placeholder.svg'}
                    alt={sponsor.name}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {sponsorSection.viewAllButton?.[0] && (
        <div className='flex justify-center'>
          <Button asChild>
            <Link href={sponsorSection.viewAllButton[0].url}>
              <Heart className='h-4 w-4 mr-2' />
              {sponsorSection.viewAllButton[0].label}
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
