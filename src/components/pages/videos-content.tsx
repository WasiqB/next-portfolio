'use client';

import { ArrowLeft, Bell, Eye, Heart, MessageSquare, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { FaYoutube } from 'react-icons/fa6';
import { formatDate } from '@/lib/date-utils';
import { shortenNumber } from '@/lib/number-utils';
import type { Video } from '@/types/portfolio-types';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

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

function formatViewCount(count: number): string {
  return `${shortenNumber(count)} views`;
}

function VideoCard({ video }: { video: Video & { imageNode?: React.ReactNode } }) {
  const { theme } = useTheme();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
    >
      <Link key={video.id} href={video.videoUrl} target='_blank' rel='noopener noreferrer' className='block h-full'>
        <Card className='h-full flex flex-col overflow-hidden hover:border-primary/50'>
          <div className='relative aspect-video w-full group cursor-pointer'>
            {video.imageNode}
            <div className='absolute inset-0 bg-black/50 dark:bg-white/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
              <div className='rounded-full bg-primary/90 p-3'>
                <Play className='h-6 w-6' fill={theme !== 'dark' ? 'white' : 'black'} />
              </div>
            </div>
            <span className='sr-only'>Watch {video.title}</span>
          </div>
          <CardContent className='p-4 grow'>
            <h3 className='font-medium line-clamp-2 mb-2'>{video.title}</h3>
            <p className='text-xs text-muted-foreground mb-1'>{formatDate(video.publishDate)}</p>
          </CardContent>
          <CardFooter className='p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground'>
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
    </motion.div>
  );
}

interface VideoContentProps {
  initialVideos: (Video & { imageNode?: React.ReactNode })[];
  channelStats: {
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
  };
  channelUrl: string;
}

export default function VideoContent({ initialVideos, channelStats, channelUrl }: VideoContentProps) {
  const [activeTab, setActiveTab] = useState('all');

  // Filter videos based on active tab
  const getFilteredVideos = () => {
    if (activeTab === 'all') return initialVideos;
    return initialVideos.filter((video) => video.category === activeTab);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'
    >
      <motion.div variants={itemVariants} className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#videos'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>All Videos</h1>
      </motion.div>

      <Tabs defaultValue='all' className='mb-8' onValueChange={setActiveTab}>
        <motion.div variants={itemVariants} className='flex justify-center'>
          <TabsList variant='line'>
            <TabsTrigger value='all'>All Videos</TabsTrigger>
            <TabsTrigger value='video'>Videos</TabsTrigger>
            <TabsTrigger value='short'>Shorts</TabsTrigger>
          </TabsList>
        </motion.div>

        <AnimatePresence mode='wait'>
          <TabsContent value='all' className='mt-6' key='all'>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            >
              {getFilteredVideos().map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value='video' className='mt-6' key='video'>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            >
              {getFilteredVideos().map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value='short' className='mt-6' key='short'>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            >
              {getFilteredVideos().map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mt-16 bg-muted/50 rounded-lg p-8 text-center'
      >
        <h2 className='text-2xl font-bold mb-4'>Subscribe for More Content!</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto mb-6'>
          Join my YouTube channel for Testing tutorials, automation tips, and in-depth tech discussions. Don't miss out
          on the latest content!
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild variant='outline' size='lg'>
            <Link href={channelUrl} target='_blank' rel='noopener noreferrer'>
              <FaYoutube className='h-5 w-5 mr-2' />
              Visit My Channel
            </Link>
          </Button>
          <Button asChild size='lg'>
            <Link href={`${channelUrl}?sub_confirmation=1`} target='_blank' rel='noopener noreferrer'>
              <Bell className='h-5 w-5 mr-2' />
              Subscribe Now
            </Link>
          </Button>
        </div>
        <div className='mt-6 flex justify-center gap-8 text-sm text-muted-foreground'>
          <div className='text-center'>
            <div className='font-semibold text-foreground'>{shortenNumber(channelStats?.subscriberCount || 0)}</div>
            <div>Subscribers</div>
          </div>
          <div className='text-center'>
            <div className='font-semibold text-foreground'>{shortenNumber(channelStats?.videoCount || 0)}</div>
            <div>Videos</div>
          </div>
          <div className='text-center'>
            <div className='font-semibold text-foreground'>{shortenNumber(channelStats?.viewCount || 0)}</div>
            <div>Total Views</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
