'use client';

import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaGithub, FaPatreon } from 'react-icons/fa6';
import type { Sponsor, SponsorTier } from '@/types/portfolio-types';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface SponsorCardProps {
  sponsor: Sponsor & { imageNode?: React.ReactNode };
}

function SponsorCard({ sponsor }: SponsorCardProps) {
  const tierName = sponsor.tier;
  const platform = sponsor.platform;

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
      <Link href={sponsor.url} target='_blank' rel='noopener noreferrer' className='group block'>
        <div className='relative w-full aspect-square mb-3'>
          <div className='relative w-full h-full overflow-hidden rounded-full border-2 border-muted transition-all group-hover:border-primary'>
            {sponsor.imageNode}
          </div>

          {platform && (
            <div
              className={`absolute bottom-0 right-0 p-1.5 rounded-full border shadow-md z-10 transition-transform group-hover:scale-110 ${
                platform === 'github' ? 'bg-card text-foreground border-border' : 'bg-[#FF424D] text-white border-none'
              }`}
            >
              {platform === 'github' ? <FaGithub className='h-3.5 w-3.5' /> : <FaPatreon className='h-3.5 w-3.5' />}
            </div>
          )}
        </div>
        <div className='text-center'>
          <h3 className='font-medium'>{sponsor.name}</h3>
          {tierName && <p className='text-xs text-muted-foreground capitalize'>{tierName} Sponsor</p>}
        </div>
      </Link>
    </motion.div>
  );
}

function getTierClass(tier: string) {
  switch (tier) {
    case 'platinum':
      return 'bg-gradient-to-r from-slate-300 to-slate-400';
    case 'gold':
      return 'bg-gradient-to-r from-yellow-300 to-yellow-400';
    case 'silver':
      return 'bg-gradient-to-r from-gray-300 to-gray-400';
    case 'bronze':
      return 'bg-gradient-to-r from-amber-600 to-amber-700';
    default:
      return 'bg-muted';
  }
}

interface SponsorContentProps {
  sponsors: (Sponsor & { imageNode?: React.ReactNode })[];
  tiers: SponsorTier[];
}

export default function SponsorContent({ sponsors, tiers }: SponsorContentProps) {
  const getSponsorsByTier = (tierSlug: string) => sponsors.filter((s) => s.tier === tierSlug);

  const otherSponsors = sponsors.filter((s) => {
    return s.tier === 'one_time' || s.tier === 'donation';
  });

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'
    >
      <motion.div variants={itemVariants} className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#sponsors'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Sponsors</h1>
      </motion.div>

      <div className='space-y-8 mb-16'>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Why Sponsor Me?</CardTitle>
              <CardDescription>Support my open source work and help me create more content</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>
                By becoming a sponsor, you're not just supporting my work, you're investing in the future of open source
                software and educational content that benefits the entire QA community.
              </p>
              <p className='font-medium'>Your sponsorship helps me dedicate more time to:</p>
              <ul className='grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-6 py-2'>
                <li>Creating high-quality tutorials and educational content</li>
                <li>Maintaining and improving open source projects</li>
                <li>Developing new tools and libraries for the community</li>
                <li>Mentoring new QA and contributing to the ecosystem</li>
              </ul>
              <p>
                In return, sponsors receive benefits like priority support, shout out on my Socials, personalized
                consulting, and recognition on my website and GitHub repositories.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <motion.div variants={itemVariants}>
            <Card className='h-full flex flex-col justify-between border-primary/20 hover:border-primary/50 transition-colors'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center text-lg md:text-xl'>
                  <FaGithub className='h-5 w-5 mr-2 text-foreground' />
                  GitHub Sponsors
                </CardTitle>
                <CardDescription>Support me through GitHub Sponsors</CardDescription>
              </CardHeader>
              <CardContent className='grow text-sm text-muted-foreground pb-4'>
                GitHub Sponsors allows you to support my work with monthly recurring payments or one-time contributions.
              </CardContent>
              <div className='p-6 pt-0'>
                <Button className='w-full' asChild>
                  <Link href='https://github.com/sponsors/WasiqB' target='_blank' rel='noopener noreferrer'>
                    <Heart className='h-4 w-4 mr-2 text-red-500 fill-red-500' />
                    Sponsor on GitHub
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className='h-full flex flex-col justify-between border-orange-500/20 hover:border-orange-500/50 transition-colors'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center text-lg md:text-xl'>
                  <FaPatreon className='h-5 w-5 mr-2 text-[#FF424D]' />
                  Patreon Sponsors
                </CardTitle>
                <CardDescription>Support me through Patreon</CardDescription>
              </CardHeader>
              <CardContent className='grow text-sm text-muted-foreground pb-4'>
                Support me on Patreon to unlock exclusive benefits, early access, and private community channels.
              </CardContent>
              <div className='p-6 pt-0'>
                <Button className='w-full bg-[#FF424D] hover:bg-[#FF424D]/90 text-white border-[#FF424D]' asChild>
                  <Link href='https://www.patreon.com/wasiqbhamla' target='_blank' rel='noopener noreferrer'>
                    <FaPatreon className='h-4 w-4 mr-2' />
                    Sponsor on Patreon
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className='space-y-16'>
        <div className='mb-16'>
          <motion.h2 variants={itemVariants} className='text-2xl font-bold mb-8'>
            Current Sponsors
          </motion.h2>

          {sponsors.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className='flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/30 text-center max-w-2xl mx-auto'
            >
              <Heart className='h-10 w-10 mb-4 text-muted-foreground/50' />
              <h3 className='text-xl font-semibold mb-2'>No Sponsors Yet</h3>
              <p className='text-muted-foreground mb-6'>
                Be the first to support my open source work and get featured here!
              </p>
            </motion.div>
          ) : (
            <>
              {tiers
                .sort((a, b) => b.price - a.price)
                .map((tier) => {
                  const tierSponsors = getSponsorsByTier(tier.id);
                  if (!tierSponsors.length) return null;
                  return (
                    <motion.div variants={itemVariants} className='mb-12' key={tier.id}>
                      <h3 className='text-xl font-semibold mb-4 inline-flex items-center'>
                        <span className={`${getTierClass(tier.id)} w-6 h-6 rounded-full mr-2`}></span>
                        {tier.name} Sponsors
                      </h3>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                        {tierSponsors.map((sponsor) => (
                          <SponsorCard key={sponsor.name} sponsor={sponsor} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              {/* Other Sponsors */}
              {otherSponsors.length > 0 && (
                <div className='mb-12'>
                  <h3 className='text-xl font-semibold mb-4 inline-flex items-center'>
                    <span className='bg-muted w-6 h-6 rounded-full mr-2'></span>
                    Other Sponsors
                  </h3>
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {otherSponsors.map((sponsor) => (
                      <SponsorCard key={sponsor.name} sponsor={sponsor} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className='mb-16'>
        <motion.h2 variants={itemVariants} className='text-2xl font-bold mb-8'>
          Sponsorship Tiers
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch'>
          {tiers.map((tier) => {
            const isHighlighted = tier.highlight;
            return (
              <motion.div
                key={tier.id}
                variants={itemVariants}
                className={
                  isHighlighted
                    ? 'relative z-10 md:scale-[1.02] lg:scale-[1.04] xl:scale-[1.05] transition-transform duration-300'
                    : ''
                }
              >
                <Card
                  className={`flex flex-col h-full transition-all duration-300 ${
                    isHighlighted
                      ? 'border-primary ring-2 ring-primary/20 shadow-xl hover:shadow-2xl bg-linear-to-b from-card to-primary/5'
                      : 'border-border hover:shadow-lg'
                  }`}
                >
                  {isHighlighted && (
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2 z-20'>
                      <span className='inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full shadow-md'>
                        <Sparkles className='h-3 w-3 fill-current' />
                        Recommended
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <span className={`${getTierClass(tier.id)} w-4 h-4 rounded-full`}></span>
                      {tier.name}
                    </CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className='mt-4'>
                      <span className='text-2xl font-bold'>{tier.price ? `$${tier.price}/mo` : 'Any amount'}</span>
                    </div>
                  </CardHeader>
                  <CardContent className='grow'>
                    <ul className='space-y-2'>
                      {tier.benefits?.map((benefit, index) => (
                        <li key={index} className='flex items-start'>
                          <span className='h-2 w-2 rounded-full bg-primary mt-2 mr-2 shrink-0' />
                          <span className='text-sm text-muted-foreground'>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className='p-4 pt-0 grid grid-cols-2 gap-2 mt-4'>
                    <Button asChild variant={isHighlighted ? 'default' : 'outline'} size='sm' className='w-full'>
                      <Link
                        href={tier.tierUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center gap-1'
                      >
                        <FaGithub className='h-3.5 w-3.5' />
                        GitHub
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant={isHighlighted ? 'default' : 'outline'}
                      size='sm'
                      className={`w-full ${
                        isHighlighted
                          ? 'bg-[#FF424D] hover:bg-[#FF424D]/90 text-white border-[#FF424D]'
                          : 'hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30'
                      }`}
                    >
                      <Link
                        href={tier.patreonUrl || 'https://patreon.com/WasiqB'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center gap-1'
                      >
                        <FaPatreon className='h-3.5 w-3.5' />
                        Patreon
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
