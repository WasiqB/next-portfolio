import type { Metadata } from 'next';
import { Suspense } from 'react';
import VideosServerContent from '@/components/pages/videos-server-content';
import { VideosSkeleton } from '@/components/skeletons/videos';

export const metadata: Metadata = {
  title: 'My Videos',
  description: 'My videos on various testing related topics',
};

export default function VideosPage() {
  return (
    <Suspense fallback={<VideosSkeleton />}>
      <VideosServerContent />
    </Suspense>
  );
}
