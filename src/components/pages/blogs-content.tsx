'use client';

import { ArrowLeft, CalendarIcon } from 'lucide-react';
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
    <Link
      href={blog.url}
      target='_blank'
      rel='noopener noreferrer'
      className='block h-full transition-transform hover:scale-[1.02]'
    >
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
      <div className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#blogs'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>All Blogs</h1>
      </div>
      <Tabs defaultValue='all' className='mb-8' onValueChange={setActiveTab}>
        <div className='flex justify-center'>
          <TabsList>
            <TabsTrigger value='all'>All Blogs</TabsTrigger>
            {sources.map((source) => (
              <TabsTrigger key={source} value={source}>
                {source}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value='all' className='mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {sortedBlogs.map((blog) => (
              <BlogCard key={blog.url} blog={blog} />
            ))}
          </div>
        </TabsContent>
        {sources.map((source) => (
          <TabsContent key={source} value={source} className='mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sortedBlogs
                .filter((blog) => getBlogSource(blog.url) === source)
                .map((blog) => (
                  <BlogCard key={blog.url} blog={blog} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
