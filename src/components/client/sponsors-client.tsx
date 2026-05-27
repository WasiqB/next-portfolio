'use client';

import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaGithub, FaPatreon } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import type { HomePage, Sponsor, SponsorTier } from '@/types/portfolio-types';

interface SponsorsClientProps {
  sponsorSection: HomePage['sponsorSection'];
  sponsors: (Sponsor & { imageNode?: React.ReactNode })[];
  tiers: SponsorTier[];
}

export default function SponsorsClient({ sponsorSection, sponsors, tiers }: SponsorsClientProps) {
  const tierOrder = tiers.sort((a, b) => b.price - a.price).map((tier) => tier.id);

  // Sort sponsors by tier priority
  const sortedSponsors = [...sponsors].sort((a, b) => {
    const aTier = a.tier;
    const bTier = b.tier;

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

      {topSponsors.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto mb-12'>
          {topSponsors.map((sponsor, index) => {
            return (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='flex justify-center'
              >
                <Link href={sponsor.url} target='_blank' rel='noopener noreferrer' className='group block relative'>
                  <div className='relative w-24 h-24 md:w-32 md:h-32'>
                    <div className='relative w-full h-full overflow-hidden rounded-full border-2 border-muted transition-all group-hover:border-primary'>
                      {sponsor.imageNode}
                    </div>
                    {sponsor.platform && (
                      <div
                        className={`absolute bottom-0 right-0 p-1.5 rounded-full border shadow-md z-10 transition-transform group-hover:scale-110 ${
                          sponsor.platform === 'github'
                            ? 'bg-card text-foreground border-border'
                            : 'bg-[#FF424D] text-white border-none'
                        }`}
                      >
                        {sponsor.platform === 'github' ? (
                          <FaGithub className='h-3.5 w-3.5' />
                        ) : (
                          <FaPatreon className='h-3.5 w-3.5' />
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center justify-center space-y-4 mb-12 text-center'
        >
          <div className='p-6 border border-dashed rounded-lg bg-muted/50 max-w-lg w-full'>
            <Heart className='h-8 w-8 mx-auto mb-3 text-muted-foreground' />
            <h3 className='text-lg font-medium mb-2'>No sponsors yet</h3>
            <p className='text-muted-foreground mb-4'>
              Be the first to support my open source work and get featured here!
            </p>
          </div>
        </motion.div>
      )}

      {sponsorSection.viewAllButton && (
        <div className='flex justify-center'>
          <Button asChild>
            <Link href={sponsorSection.viewAllButton.url}>
              <Heart className='h-4 w-4 mr-2' />
              {sponsorSection.viewAllButton.label}
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
