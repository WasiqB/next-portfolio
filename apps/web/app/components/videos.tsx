'use client';

import { Button } from '@wb/ui/components/button';
import { Card, CardContent, CardFooter } from '@wb/ui/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@wb/ui/components/tabs';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageSquare, Play } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Data as portfolioData } from '../data/portfolio-data';
import { Video } from '../types/portfolio-types';

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

export default function Videos() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function loadVideos() {
      setIsLoading(true);
      try {
        const channelId = portfolioData.videos.youtubeChannelId;
        if (!channelId) return;
        const res = await fetch(`/api/videos?channelId=${channelId}`);
        if (!res.ok) return;
        const data = await res.json();
        setVideos(data.videos);
      } finally {
        setIsLoading(false);
      }
    }
    loadVideos();
  }, []);

  // Filter videos based on active tab
  const getFilteredVideos = () => {
    if (activeTab === 'all') return videos.slice(0, 4);
    return videos.filter((video) => video.category === activeTab).slice(0, 4);
  };

  return (
    <section
      id='videos'
      className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 space-y-4 text-center'
      >
        <h2 className='text-3xl font-bold md:text-4xl'>My Videos</h2>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          Check out my latest video tutorials and tech talks.
        </p>
      </motion.div>

      <Tabs defaultValue='all' className='mb-8' onValueChange={setActiveTab}>
        <div className='flex justify-center'>
          <TabsList>
            <TabsTrigger value='all'>All Videos</TabsTrigger>
            <TabsTrigger value='video'>Videos</TabsTrigger>
            <TabsTrigger value='short'>Shorts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='all' className='mt-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <VideoSkeleton key={index} />
                ))
              : getFilteredVideos().map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
          </div>
        </TabsContent>

        <TabsContent value='video' className='mt-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <VideoSkeleton key={index} />
                ))
              : getFilteredVideos().map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
          </div>
        </TabsContent>

        <TabsContent value='short' className='mt-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <VideoSkeleton key={index} />
                ))
              : getFilteredVideos().map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className='mt-8 flex justify-center'>
        <Button asChild>
          <Link href='/videos'>See All Videos</Link>
        </Button>
      </div>
    </section>
  );
}
