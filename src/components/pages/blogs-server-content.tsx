import { getBlogs } from '@/actions/blogs';
import BlogsClientContent from '@/components/pages/blogs-client-content';

export default async function BlogsServerContent() {
  const blogs = await getBlogs() || [];
  
  return <BlogsClientContent blogs={blogs} />;
}
