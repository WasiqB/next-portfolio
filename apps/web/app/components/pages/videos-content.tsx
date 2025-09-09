'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import { CACHE_DURATION } from '@/app/lib/constants';
import { Video } from '@/app/types/portfolio-types';
import { Button } from '@wb/ui/components/button';
import { Card, CardContent, CardFooter } from '@wb/ui/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@wb/ui/components/tabs';
import { ArrowLeft, Bell, Eye, Heart, MessageSquare, Play } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaYoutube } from 'react-icons/fa6';

// Format view count
function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  } else {
    return `${count} views`;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format large numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Video card component
function VideoCard({ video }: { video: Video }) {
  const { theme } = useTheme();
  return (
    <Link
      key={video.id}
      href={video.videoUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='block h-full transition-transform hover:scale-[1.02]'
    >
      <Card className='hover:border-primary/50 flex h-full flex-col overflow-hidden'>
        <div className='group relative aspect-video w-full cursor-pointer'>
          <Image
            src={video.thumbnail || '/placeholder.svg'}
            alt={video.title}
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white/50'>
            <div className='bg-primary/90 rounded-full p-3'>
              <Play
                className='h-6 w-6'
                fill={theme !== 'dark' ? 'white' : 'black'}
              />
            </div>
          </div>
          <span className='sr-only'>Watch {video.title}</span>
        </div>
        <CardContent className='flex-grow p-4'>
          <h3 className='mb-2 line-clamp-2 font-medium'>{video.title}</h3>
          <p className='text-muted-foreground mb-1 text-xs'>
            {formatDate(video.publishDate)}
          </p>
        </CardContent>
        <CardFooter className='text-muted-foreground flex items-center justify-between p-4 pt-0 text-sm'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
              <Heart className='h-3.5 w-3.5' />
              <span>{video.likes}</span>
            </div>
            <div className='flex items-center gap-1'>
              <MessageSquare className='h-3.5 w-3.5' />
              <span>{video.comments}</span>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <Eye className='h-3.5 w-3.5' />
            <span>{formatViewCount(video.views)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function VideoSkeleton() {
  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <div className='bg-muted aspect-video w-full animate-pulse' />
      <CardContent className='flex-grow p-4'>
        <div className='bg-muted mb-2 h-4 animate-pulse rounded' />
        <div className='bg-muted mb-2 h-4 w-3/4 animate-pulse rounded' />
        <div className='bg-muted h-3 w-1/2 animate-pulse rounded' />
      </CardContent>
      <CardFooter className='flex items-center justify-between p-4 pt-0'>
        <div className='bg-muted h-3 w-16 animate-pulse rounded' />
        <div className='bg-muted h-3 w-12 animate-pulse rounded' />
      </CardFooter>
    </Card>
  );
}

export default function VideoContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [channelStats, setChannelStats] = useState({
    subscriberCount: 0,
    viewCount: 0,
    videoCount: 0,
  });

  useEffect(() => {
    async function loadVideos() {
      setIsLoading(true);
      try {
        const channelId = portfolioData.videos.youtubeChannelId;
        if (!channelId) return;
        const res = await fetch(`/api/videos?channelId=${channelId}`, {
          next: {
            revalidate: CACHE_DURATION,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        setVideos(data.videos);
        setChannelStats(data.channelStats);
      } finally {
        setIsLoading(false);
      }
    }
    loadVideos();
  }, []);

  // Filter videos based on active tab
  const getFilteredVideos = () => {
    if (activeTab === 'all') return videos;
    return videos.filter((video) => video.category === activeTab);
  };

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#videos'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>All Videos</h1>
      </div>

      <Tabs defaultValue='all' className='mb-8' onValueChange={setActiveTab}>
        <div className='flex justify-center'>
          <TabsList>
            <TabsTrigger value='all'>All Videos</TabsTrigger>
            <TabsTrigger value='video'>Videos</TabsTrigger>
            <TabsTrigger value='short'>Shorts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='all' className='mt-6'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <VideoSkeleton key={index} />
                ))
              : getFilteredVideos().map((video, index) => (
                  <div key={video.id}>
                    <VideoCard video={video} />
                  </div>
                ))}
          </div>
        </TabsContent>

        <TabsContent value='video' className='mt-6'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {getFilteredVideos().map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value='short' className='mt-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {getFilteredVideos().map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className='bg-muted/50 mt-16 rounded-lg p-8 text-center'>
        <h2 className='mb-4 text-2xl font-bold'>Subscribe for More Content!</h2>
        <p className='text-muted-foreground mx-auto mb-6 max-w-2xl'>
          Join my YouTube channel for Testing tutorials, automation tips, and
          in-depth tech discussions. Don't miss out on the latest content!
        </p>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Button asChild variant='outline' size='lg'>
            <Link
              href={portfolioData.videos.channelUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaYoutube className='mr-2 h-5 w-5' />
              Visit My Channel
            </Link>
          </Button>
          <Button asChild size='lg'>
            <Link
              href={`${portfolioData.videos.channelUrl}?sub_confirmation=1`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Bell className='mr-2 h-5 w-5' />
              Subscribe Now
            </Link>
          </Button>
        </div>
        <div className='text-muted-foreground mt-6 flex justify-center gap-8 text-sm'>
          <div className='text-center'>
            <div className='text-foreground font-semibold'>
              {formatNumber(channelStats.subscriberCount)}
            </div>
            <div>Subscribers</div>
          </div>
          <div className='text-center'>
            <div className='text-foreground font-semibold'>
              {formatNumber(channelStats.videoCount)}
            </div>
            <div>Videos</div>
          </div>
          <div className='text-center'>
            <div className='text-foreground font-semibold'>
              {formatNumber(channelStats.viewCount)}
            </div>
            <div>Total Views</div>
          </div>
        </div>
      </div>
    </div>
  );
}
