'use client';

import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import type { Sponsor, SponsorTier } from '@/payload/types';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface SponsorCardProps {
  sponsor: Sponsor & { imageNode?: React.ReactNode };
}

function SponsorCard({ sponsor }: SponsorCardProps) {
  const tierName = typeof sponsor.tier === 'object' ? sponsor.tier.name : '';

  return (
    <Link href={sponsor.url} target='_blank' rel='noopener noreferrer' className='group'>
      <div className='relative aspect-square overflow-hidden rounded-full border-2 border-muted transition-all hover:border-primary'>
        {sponsor.imageNode}
      </div>
      <div className='mt-3 text-center'>
        <h3 className='font-medium'>{sponsor.name}</h3>
        {tierName && <p className='text-xs text-muted-foreground capitalize'>{tierName} Sponsor</p>}
      </div>
    </Link>
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
  const getSponsorsByTier = (tierSlug: string) =>
    sponsors.filter((s) => (typeof s.tier === 'object' ? s.tier.slug === tierSlug : String(s.tier) === tierSlug));

  const otherSponsors = sponsors.filter((s) => {
    const tierSlug = typeof s.tier === 'object' ? s.tier.slug : String(s.tier);
    return tierSlug === 'one_time' || tierSlug === 'donation';
  });

  return (
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#sponsors'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Sponsors</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
        <div className='md:col-span-2'>
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
              <p>Your sponsorship helps me dedicate more time to:</p>
              <ul className='list-disc pl-6 space-y-2'>
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
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Heart className='h-5 w-5 mr-2 text-red-500 fill-red-500' />
                GitHub Sponsors
              </CardTitle>
              <CardDescription>Support me through GitHub Sponsors</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>
                GitHub Sponsors allows you to support my work with monthly recurring payments or one-time contributions.
              </p>
              <Button className='w-full' asChild>
                <Link href='https://github.com/sponsors/WasiqB' target='_blank' rel='noopener noreferrer'>
                  <Heart className='h-4 w-4 mr-2' />
                  Sponsor on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='space-y-16'>
        <h2 className='text-2xl font-bold mb-8'>Current Sponsors</h2>
        {tiers
          .sort((a, b) => b.price - a.price)
          .map((tier) => {
            const tierSponsors = getSponsorsByTier(tier.slug);
            if (!tierSponsors.length) return null;
            return (
              <div className='mb-12' key={tier.slug}>
                <h3 className='text-xl font-semibold mb-4 inline-flex items-center'>
                  <span className={`${getTierClass(tier.slug)} w-6 h-6 rounded-full mr-2`}></span>
                  {tier.name} Sponsors
                </h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                  {tierSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </div>
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
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='mb-16'>
        <h2 className='text-2xl font-bold mb-8'>Sponsorship Tiers</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {tiers.map((tier) => (
            <Card key={tier.slug} className='flex flex-col border-border'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <span className={`${getTierClass(tier.slug)} w-4 h-4 rounded-full`}></span>
                  {tier.name}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className='mt-4'>
                  <span className='text-2xl font-bold'>{tier.price ? `$${tier.price}/mo` : 'Any amount'}</span>
                </div>
              </CardHeader>
              <CardContent className='grow'>
                <ul className='space-y-2'>
                  {tier.benefits?.map((benefit) => (
                    <li key={benefit.id} className='flex items-start'>
                      <span className='h-2 w-2 rounded-full bg-primary mt-2 mr-2' />
                      <span>{benefit.benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className='p-4 pt-0'>
                <Button asChild className='w-full'>
                  <Link href={tier.tierUrl} target='_blank' rel='noopener noreferrer'>
                    Sponsor {tier.name}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
