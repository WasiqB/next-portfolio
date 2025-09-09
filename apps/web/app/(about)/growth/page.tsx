import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { FaHashtag, FaJava, FaMedium, FaNpm } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaX, FaYoutube } from 'react-icons/fa6';

// Define the platform type
interface Platform {
  name: string;
  icon: React.ReactNode;
  url: string;
  stats: {
    label: string;
    value: string | number;
  }[];
  color: string;
}

// Sample platform data
const platforms: Platform[] = [
  {
    name: 'YouTube',
    icon: <FaYoutube className='h-6 w-6' />,
    url: 'https://youtube.com/@johndoe',
    stats: [
      { label: 'Subscribers', value: '25.4K' },
      { label: 'Total Views', value: '1.2M' },
      { label: 'Videos', value: 87 },
    ],
    color: 'bg-red-500',
  },
  {
    name: 'GitHub',
    icon: <FaGithub className='h-6 w-6' />,
    url: 'https://github.com/johndoe',
    stats: [
      { label: 'Followers', value: '3.2K' },
      { label: 'Repositories', value: 142 },
      { label: 'Stars', value: '12.5K' },
    ],
    color: 'bg-gray-800',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className='h-6 w-6' />,
    url: 'https://linkedin.com/in/johndoe',
    stats: [
      { label: 'Connections', value: '5.8K' },
      { label: 'Followers', value: '7.2K' },
      { label: 'Posts', value: 124 },
    ],
    color: 'bg-blue-600',
  },
  {
    name: 'Twitter',
    icon: <FaX className='h-6 w-6' />,
    url: 'https://twitter.com/johndoe',
    stats: [
      { label: 'Followers', value: '18.7K' },
      { label: 'Following', value: 843 },
      { label: 'Tweets', value: '3.4K' },
    ],
    color: 'bg-sky-500',
  },
  {
    name: 'Hashnode',
    icon: <FaHashtag className='h-6 w-6' />,
    url: 'https://hashnode.com/@johndoe',
    stats: [
      { label: 'Followers', value: '4.3K' },
      { label: 'Articles', value: 56 },
      { label: 'Reactions', value: '9.7K' },
    ],
    color: 'bg-blue-700',
  },
  {
    name: 'Medium',
    icon: <FaMedium className='h-6 w-6' />,
    url: 'https://medium.com/@johndoe',
    stats: [
      { label: 'Followers', value: '6.1K' },
      { label: 'Articles', value: 78 },
      { label: 'Claps', value: '32.5K' },
    ],
    color: 'bg-black',
  },
  {
    name: 'Maven Projects',
    icon: <FaJava className='h-6 w-6' />,
    url: 'https://mvnrepository.com/search?q=johndoe',
    stats: [
      { label: 'Projects', value: 12 },
      { label: 'Downloads', value: '1.8M' },
      { label: 'Stars', value: '3.2K' },
    ],
    color: 'bg-orange-600',
  },
  {
    name: 'NPM Packages',
    icon: <FaNpm className='h-6 w-6' />,
    url: 'https://www.npmjs.com/~johndoe',
    stats: [
      { label: 'Packages', value: 23 },
      { label: 'Downloads', value: '4.5M' },
      { label: 'GitHub Stars', value: '7.8K' },
    ],
    color: 'bg-red-600',
  },
];

export default function GrowthPage() {
  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Growth</h1>
      </div>

      <div className='mx-auto mb-12 max-w-3xl'>
        <p className='text-muted-foreground text-lg'>
          Track my growth and impact across various platforms. Click on any card
          to visit the respective platform.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {platforms.map((platform) => (
          <Link
            key={platform.name}
            href={platform.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group'
          >
            <Card className='hover:border-primary h-full transition-all duration-300 hover:shadow-md'>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <div
                    className={`${platform.color} rounded-lg p-2 text-white`}
                  >
                    {platform.icon}
                  </div>
                  <ArrowUpRight className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
                </div>
                <CardTitle className='mt-2'>{platform.name}</CardTitle>
                <CardDescription>Latest statistics</CardDescription>
              </CardHeader>
              <CardContent className='pb-4'>
                <div className='space-y-2'>
                  {platform.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className='flex items-center justify-between'
                    >
                      <span className='text-muted-foreground text-sm'>
                        {stat.label}
                      </span>
                      <span className='font-medium'>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className='pt-0'>
                <div className='bg-muted h-1 w-full overflow-hidden rounded-full'>
                  <div
                    className={`h-full ${platform.color} transition-all duration-500 group-hover:w-full`}
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className='bg-muted/50 mt-16 rounded-lg p-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='mb-4 text-2xl font-bold'>Growth Analysis</h2>
          <p className='text-muted-foreground mb-6'>
            These statistics are updated monthly to track my growth and
            engagement across different platforms. My goal is to create valuable
            content and build meaningful connections in the developer community.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button asChild>
              <Link href='#contact'>Contact Me</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/about'>Learn More About Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
