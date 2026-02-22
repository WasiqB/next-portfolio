'use client';

import { GitFork, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { HomePage, Project } from '@/types/portfolio-types';

interface ProjectsClientProps {
  projectSection: HomePage['projectSection'];
  projectData: Project[];
}

export default function ProjectsClient({ projectSection, projectData }: ProjectsClientProps) {
  return (
    <section id='projects' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-12'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>{projectSection?.title}</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>{projectSection?.description}</p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projectData.slice(0, 4).map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.5 }} className='h-full'>
              <Link key={index} href={project.link} target='_blank' className='block h-full'>
                <Card className='h-full flex flex-col overflow-hidden cursor-pointer border-2 hover:border-primary/50'>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='grow'>
                    <div className='flex flex-wrap gap-2'>
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant='secondary'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-end gap-4 text-sm text-muted-foreground pt-0'>
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4' />
                      <span>{project.stars}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <GitFork className='h-4 w-4' />
                      <span>{project.forks}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href={projectSection?.allProjectsButton?.url || ''}>{projectSection?.allProjectsButton?.label}</Link>
        </Button>
      </div>
    </section>
  );
}
