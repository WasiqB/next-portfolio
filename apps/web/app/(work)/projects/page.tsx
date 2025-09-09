import ProjectPageContent from '@/app/components/pages/projects-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'My open source projects about various automation tools',
};

export default function ProjectsPage() {
  return <ProjectPageContent />;
}
