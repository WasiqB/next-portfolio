'use client';

import { ArrowLeft, GitFork, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/portfolio-types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface ProjectPageContentProps {
  projects: Project[];
  githubUsername: string;
}

export default function ProjectPageContent({ projects, githubUsername }: ProjectPageContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'
    >
      <motion.div variants={itemVariants} className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#projects'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>All Projects</h1>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.5 }}>
            <Link href={project.link} target='_blank' className='block h-full'>
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
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mt-16 bg-muted/50 rounded-lg p-8 text-center'
      >
        <h2 className='text-2xl font-bold mb-4'>Want to See More?</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto mb-6'>
          Check out my GitHub profile for more projects, open-source contributions, and code repositories.
        </p>
        <Button asChild>
          <Link href={`https://github.com/${githubUsername}`} target='_blank' rel='noopener noreferrer'>
            <FaGithub className='h-4 w-4 mr-2' />
            Visit My GitHub
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
