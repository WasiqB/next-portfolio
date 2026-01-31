'use client';

import { CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBlogSource } from '@/lib/blogs-utils';
import { formatDate } from '@/lib/date-utils';
import type { HomePage } from '@/payload/types';
import type { Blog } from '@/types/portfolio-types';

interface BlogsClientProps {
  blogSection: HomePage['blogSection'];
  blogData: (Blog & { imageNode?: React.ReactNode })[];
}

function BlogCard({ blog }: { blog: Blog & { imageNode?: React.ReactNode } }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.5 }} className='h-full'>
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

export default function BlogsClient({ blogSection, blogData }: BlogsClientProps) {
  const [_activeTab, setActiveTab] = useState('all');

  const blogsWithSource = blogData.map((blog) => ({
    ...blog,
    displaySource: getBlogSource(blog.url),
  }));

  const sources = Array.from(new Set(blogsWithSource.map((b) => b.displaySource)));

  const sortedBlogs = [...blogsWithSource].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <section id='blogs' className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-8'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>{blogSection?.title}</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>{blogSection?.description}</p>
      </motion.div>

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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {sortedBlogs.slice(0, 4).map((blog, index) => (
              <motion.div
                key={blog.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
        {sources.map((source) => (
          <TabsContent key={source} value={source} className='mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {sortedBlogs
                .filter((blog) => blog.displaySource === source)
                .slice(0, 4)
                .map((blog, index) => (
                  <motion.div
                    key={blog.url}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href={blogSection?.viewAllButton?.[0]?.url || '/blogs'}>
            {blogSection?.viewAllButton?.[0]?.label || 'See All Blogs'}
          </Link>
        </Button>
      </div>
    </section>
  );
}
