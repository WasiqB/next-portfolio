import BlogsContent from '@/app/components/pages/blogs-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Blogs',
  description: 'My blogs on various testing related topics',
};

export default function BlogsPage() {
  return <BlogsContent />;
}
