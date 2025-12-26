import type { Metadata } from 'next';
import ProjectPageContent from '@/components/pages/projects-content';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'My open source projects about various automation tools',
};

export default function ProjectsPage() {
  return <ProjectPageContent />;
}
