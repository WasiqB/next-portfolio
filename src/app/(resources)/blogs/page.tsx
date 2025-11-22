import type { Metadata } from 'next';
import { Suspense } from 'react';
import BlogsContent from '@/components/pages/blogs-content';
import { BlogsSkeleton } from '@/components/skeletons/blogs';

export const metadata: Metadata = {
  title: 'My Blogs',
  description: 'My blogs on various testing related topics',
};

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsContent />
    </Suspense>
  );
}
