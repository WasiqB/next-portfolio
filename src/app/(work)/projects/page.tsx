import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectPageContent from '@/components/pages/projects-content';
import { ProjectsSkeleton } from '@/components/skeletons/projects';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'My open source projects about various automation tools',
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectPageContent />
    </Suspense>
  );
}
