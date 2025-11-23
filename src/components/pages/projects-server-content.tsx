import { getProjects } from '@/actions/projects';
import ProjectsClientContent from '@/components/pages/projects-client-content';

export default async function ProjectsServerContent() {
  const projects = await getProjects() || [];
  
  return <ProjectsClientContent projects={projects} />;
}
