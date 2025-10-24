import BlogsContent from '@/components/pages/blogs-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Blogs',
  description: 'My blogs on various testing related topics',
};

export default function BlogsPage() {
  return <BlogsContent />;
}
