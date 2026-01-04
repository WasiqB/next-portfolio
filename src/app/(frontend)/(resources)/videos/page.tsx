import type { Metadata } from 'next';
import VideoContent from '@/components/pages/videos-content';

export const metadata: Metadata = {
  title: 'My Videos',
  description: 'My videos on various testing related topics',
};

export default function VideosPage() {
  return <VideoContent />;
}
