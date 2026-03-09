'use client';

import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { getBlogSource } from '@/lib/blogs-utils';
import { formatDate } from '@/lib/date-utils';
import type { Blog } from '@/types/portfolio-types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function BlogCard({ blog }: { blog: Blog & { imageNode?: React.ReactNode } }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={blog.url} target='_blank' rel='noopener noreferrer' className='block h-full'>
        <Card className='h-full flex flex-col overflow-hidden cursor-pointer border-2 hover:border-primary/50'>
          <div className='relative h-48 w-full'>
            {blog.imageNode}
            <div className='absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium'>
              {getBlogSource(blog.url)}
            </div>
          </div>
          <CardHeader className='p-4 pb-2'>
            <h3 className='text-lg font-bold line-clamp-2'>{blog.title}</h3>
          </CardHeader>
          <CardContent className='p-4 pt-0 grow'>
            <p className='text-muted-foreground text-sm line-clamp-3 mb-3'>{blog.description}</p>
            {blog.tags && (
              <div className='flex flex-wrap gap-2 mb-3'>
                {blog.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant='secondary' className='text-xs'>
                    {tag}
                  </Badge>
                ))}
                {blog.tags.length > 2 && (
                  <Badge variant='outline' className='text-xs'>
                    +{blog.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
            <div className='flex items-center text-xs text-muted-foreground'>
              <CalendarIcon className='h-3.5 w-3.5 mr-1' />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

interface BlogsContentProps {
  blogs: (Blog & { imageNode?: React.ReactNode })[];
}

export default function BlogsContent({ blogs }: BlogsContentProps) {
  const sources = Array.from(new Set(blogs.map((b) => getBlogSource(b.url))));

  const [_activeTab, setActiveTab] = useState('all');

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className='flex items-center gap-4 mb-8'
        transition={{ duration: 0.5 }}
      >
        <Button variant='outline' size='sm' asChild>
          <Link href='/#blogs'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>All Blogs</h1>
      </motion.div>
      <Tabs defaultValue='all' className='mb-8' onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='flex justify-center'
        >
          <TabsList variant='line'>
            <TabsTrigger value='all'>All Blogs</TabsTrigger>
            {sources.map((source) => (
              <TabsTrigger key={source} value={source}>
                {source}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>
        <AnimatePresence mode='wait'>
          <TabsContent value='all' className='mt-6' key='all'>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            >
              {sortedBlogs.map((blog) => (
                <BlogCard key={blog.url} blog={blog} />
              ))}
            </motion.div>
          </TabsContent>
          {sources.map((source) => (
            <TabsContent key={source} value={source} className='mt-6'>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              >
                {sortedBlogs
                  .filter((blog) => getBlogSource(blog.url) === source)
                  .map((blog) => (
                    <BlogCard key={blog.url} blog={blog} />
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
