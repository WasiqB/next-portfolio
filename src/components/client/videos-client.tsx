'use client';

import { Eye, Heart, MessageSquare, Play } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate } from '@/lib/date-utils';
import { shortenNumber } from '@/lib/number-utils';
import type { HomePage, Video } from '@/types/portfolio-types';

interface VideosClientProps {
  videoSection: HomePage['videoSection'];
  videos: (Video & { imageNode?: React.ReactNode })[];
}

function formatViewCount(count: number): string {
  return `${shortenNumber(count)} views`;
}

function VideoCard({ video }: { video: Video & { imageNode?: React.ReactNode } }) {
  const { theme } = useTheme();
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.5 }} className='h-full'>
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

export default function VideosClient({ videoSection, videos }: VideosClientProps) {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredVideos = () => {
    if (activeTab === 'all') return videos.slice(0, 4);
    return videos.filter((video) => video.category === activeTab).slice(0, 4);
  };

  return (
    <section id='videos' className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-12'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>{videoSection.title}</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>{videoSection.description}</p>
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {getFilteredVideos().map((video, index) => (
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {getFilteredVideos().map((video, index) => (
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {getFilteredVideos().map((video, index) => (
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

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href={videoSection.allVideosButton?.url || '/videos'}>
            {videoSection.allVideosButton?.label || 'See All Videos'}
          </Link>
        </Button>
      </div>
    </section>
  );
}
