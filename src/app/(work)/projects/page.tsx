import ProjectPageContent from '@/components/pages/projects-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'My open source projects about various automation tools',
};

export default function ProjectsPage() {
  return <ProjectPageContent />;
}
