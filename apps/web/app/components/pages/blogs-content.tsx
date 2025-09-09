'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import { CACHE_DURATION } from '@/app/lib/constants';
import { Blog } from '@/app/types/portfolio-types';
import { Badge } from '@wb/ui/components/badge';
import { Button } from '@wb/ui/components/button';
import { Card, CardContent, CardHeader } from '@wb/ui/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@wb/ui/components/tabs';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={blog.url}
      target='_blank'
      rel='noopener noreferrer'
      className='block h-full transition-transform hover:scale-[1.02]'
    >
      <Card className='hover:border-primary/50 flex h-full cursor-pointer flex-col overflow-hidden border-2'>
        <div className='relative h-48 w-full'>
          <Image
            src={blog.image || '/placeholder.svg'}
            alt={blog.title}
            fill
            className='object-cover'
          />
          <div className='bg-background/80 absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium backdrop-blur-sm'>
            {blog.source}
          </div>
        </div>
        <CardHeader className='p-4 pb-2'>
          <h3 className='line-clamp-2 text-lg font-bold'>{blog.title}</h3>
        </CardHeader>
        <CardContent className='flex-grow p-4 pt-0'>
          <p className='text-muted-foreground mb-3 line-clamp-3 text-sm'>
            {blog.description}
          </p>
          {blog.tags && (
            <div className='mb-3 flex flex-wrap gap-2'>
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
          <div className='text-muted-foreground flex items-center text-xs'>
            <CalendarIcon className='mr-1 h-3.5 w-3.5' />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BlogSkeletonCard() {
  return (
    <div className='bg-muted flex h-full animate-pulse flex-col overflow-hidden rounded-lg border-2'>
      <div className='relative h-48 w-full bg-gray-200' />
      <div className='p-4 pb-2'>
        <div className='mb-2 h-5 w-3/4 rounded bg-gray-300' />
      </div>
      <div className='flex-grow p-4 pt-0'>
        <div className='mb-2 h-4 w-full rounded bg-gray-200' />
        <div className='mb-2 h-4 w-5/6 rounded bg-gray-200' />
        <div className='mb-3 flex gap-2'>
          <div className='h-5 w-12 rounded bg-gray-300' />
          <div className='h-5 w-12 rounded bg-gray-300' />
        </div>
        <div className='text-muted-foreground flex items-center text-xs'>
          <div className='mr-1 h-4 w-4 rounded bg-gray-300' />
          <div className='h-4 w-20 rounded bg-gray-200' />
        </div>
      </div>
    </div>
  );
}

export default function BlogsContent() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogsPromise = portfolioData.blogs.sources.map(async (source) => {
          if (source.source === 'Medium') {
            const response = await fetch(
              `/api/blogs?username=${source.username}`,
              {
                next: {
                  revalidate: CACHE_DURATION,
                },
              }
            );
            return response.json() as Promise<Blog[]>;
          } else {
            const customBlogsPromise = source.urls?.map(async (url) => {
              const response = await fetch(`/api/blogs?url=${url}`, {
                next: {
                  revalidate: CACHE_DURATION,
                },
              });
              return response.json() as Promise<Blog[]>;
            });
            const customBlogs = await Promise.all(customBlogsPromise || []);
            return customBlogs.flat();
          }
        });
        const blogs = await Promise.all(blogsPromise);
        setBlogs(blogs.flat());
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Get unique sources for tabs
  const sources = Array.from(new Set(blogs.map((b) => b.source)));

  // Filter blogs based on active tab
  const [activeTab, setActiveTab] = useState('all');

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#blogs'>
            <ArrowLeft className='mr-2 h-4 w-4' />
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
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <BlogSkeletonCard key={i} />
                ))
              : sortedBlogs.map((blog) => (
                  <BlogCard key={blog.url} blog={blog} />
                ))}
          </div>
        </TabsContent>
        {sources.map((source) => (
          <TabsContent key={source} value={source} className='mt-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <BlogSkeletonCard key={i} />
                  ))
                : sortedBlogs
                    .filter((blog) => blog.source === source)
                    .map((blog) => <BlogCard key={blog.url} blog={blog} />)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
