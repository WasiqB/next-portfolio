'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import {
  Sponsor,
  SponsorsData,
  SponsorTier,
} from '@/app/types/portfolio-types';
import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { ArrowLeft, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link
      href={sponsor.profileUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='group'
    >
      <div className='border-muted hover:border-primary relative aspect-square overflow-hidden rounded-full border-2 transition-all'>
        <Image
          src={sponsor.avatarUrl || '/placeholder.svg'}
          alt={sponsor.name}
          fill
          className='object-cover transition-transform group-hover:scale-105'
        />
      </div>
      <div className='mt-3 text-center'>
        <h3 className='font-medium'>{sponsor.name}</h3>
        <p className='text-muted-foreground text-xs capitalize'>
          {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Sponsor
        </p>
        {sponsor.message && (
          <p className='text-muted-foreground mt-1 text-xs italic'>
            "{sponsor.message}"
          </p>
        )}
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

export default function SponsorContent() {
  const sponsors: SponsorsData = portfolioData.sponsors;
  const sponsorTiers: SponsorTier[] = sponsors.tiers;

  const getSponsorsByTier = (tier: string) =>
    sponsors.sponsors.filter(
      (s) => s.tier === tier && tier !== 'one_time' && tier !== 'donation'
    );
  const otherSponsors = sponsors.sponsors.filter(
    (s) => s.tier === 'one_time' || s.tier === 'donation'
  );

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#sponsors'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Sponsors</h1>
      </div>

      <div className='mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Why Sponsor Me?</CardTitle>
              <CardDescription>
                Support my open source work and help me create more content
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>
                By becoming a sponsor, you're not just supporting my work,
                you're investing in the future of open source software and
                educational content that benefits the entire QA community.
              </p>
              <p>Your sponsorship helps me dedicate more time to:</p>
              <ul className='list-disc space-y-2 pl-6'>
                <li>Creating high-quality tutorials and educational content</li>
                <li>Maintaining and improving open source projects</li>
                <li>Developing new tools and libraries for the community</li>
                <li>Mentoring new QA and contributing to the ecosystem</li>
              </ul>
              <p>
                In return, sponsors receive benefits like priority support,
                shout out on my Socials, personalized consulting, and
                recognition on my website and GitHub repositories.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Heart className='mr-2 h-5 w-5 fill-red-500 text-red-500' />
                GitHub Sponsors
              </CardTitle>
              <CardDescription>
                Support me through GitHub Sponsors
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>
                GitHub Sponsors allows you to support my work with monthly
                recurring payments or one-time contributions.
              </p>
              <Button className='w-full' asChild>
                <Link
                  href='https://github.com/sponsors/WasiqB'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Heart className='mr-2 h-4 w-4' />
                  Sponsor on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='space-y-16'>
        <h2 className='mb-8 text-2xl font-bold'>Current Sponsors</h2>
        {sponsorTiers.map((tier) => {
          const tierSponsors = getSponsorsByTier(tier.slug);
          if (!tierSponsors.length) return null;
          return (
            <div className='mb-12' key={tier.slug}>
              <h3 className='mb-4 inline-flex items-center text-xl font-semibold'>
                <span
                  className={
                    getTierClass(tier.slug) + ' mr-2 h-6 w-6 rounded-full'
                  }
                ></span>
                {tier.name} Sponsors
              </h3>
              <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
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
            <h3 className='mb-4 inline-flex items-center text-xl font-semibold'>
              <span className='bg-muted mr-2 h-6 w-6 rounded-full'></span>
              Other Sponsors
            </h3>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {otherSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='mb-16'>
        <h2 className='mb-8 text-2xl font-bold'>Sponsorship Tiers</h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {sponsorTiers.map((tier) => (
            <Card key={tier.slug} className='border-border flex flex-col'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <span
                    className={
                      getTierClass(tier.slug) + ' h-4 w-4 rounded-full'
                    }
                  ></span>
                  {tier.name}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className='mt-4'>
                  <span className='text-2xl font-bold'>
                    {tier.price ? '$' + tier.price + '/mo' : 'Any amount'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className='flex-grow'>
                <ul className='space-y-2'>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className='flex items-start'>
                      <span className='bg-primary mt-2 mr-2 h-2 w-2 rounded-full' />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className='p-4 pt-0'>
                <Button asChild className='w-full'>
                  <Link
                    href={tier.githubTierUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
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
