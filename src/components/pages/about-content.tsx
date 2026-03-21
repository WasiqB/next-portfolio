'use client';

import { ArrowLeft, Award, Briefcase, ExternalLink, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import type { AboutPage, Certificate, Education, Experience, Social } from '@/types/portfolio-types';
import CertificationShowcase from '../client/certification-section';
import EducationTimeline from '../client/education-section';
import ExperienceTimeline from '../client/experience-section';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

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

interface AboutContentProps {
  imageNode?: React.ReactNode;
  about: AboutPage;
  certificates: Certificate[];
  experiences: Experience[];
  educations: Education[];
  socialLinks: Social[];
}

export default function AboutContent({
  imageNode,
  about,
  certificates,
  experiences,
  educations,
  socialLinks,
}: AboutContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'
    >
      <motion.div variants={itemVariants} className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>About Me</h1>
      </motion.div>

      {/* Mobile profile image - visible only on mobile */}
      <motion.div variants={itemVariants} className='md:hidden mb-8'>
        <Card>
          <CardContent className='p-0'>
            <div className='relative aspect-square w-full overflow-hidden'>{imageNode}</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
        <motion.div variants={itemVariants} className='md:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Hello, I'm {about.name}</CardTitle>
              <CardDescription>{about.title}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {about.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
              <div className='pt-4'>
                <h3 className='text-lg font-semibold mb-2'>My Core Values</h3>
                <ul className='list-disc pl-6 space-y-1'>
                  {about.coreValues.map((cv, i) => (
                    <li key={i}>
                      <strong>{cv.label}:</strong> {cv.value}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className='space-y-8 hidden md:block'>
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className='p-0'>
                <div className='relative aspect-square w-full overflow-hidden'>{imageNode}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-3 gap-4'>
                  {socialLinks.map((link) => {
                    let Icon = null;
                    switch (link.platform) {
                      case 'github':
                        Icon = FaGithub;
                        break;
                      case 'linkedin':
                        Icon = FaLinkedin;
                        break;
                      case 'x':
                        Icon = FaXTwitter;
                        break;
                      case 'youtube':
                        Icon = FaYoutube;
                        break;
                      case 'instagram':
                        Icon = FaInstagram;
                        break;
                      case 'facebook':
                        Icon = FaFacebook;
                        break;
                      default:
                        Icon = ExternalLink;
                    }
                    return (
                      <Link
                        key={link.platform}
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors'
                      >
                        <Icon className='h-6 w-6' />
                        <span className='text-xs'>
                          {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {about.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mobile social links and skills - visible only on mobile */}
        <div className='md:hidden space-y-8'>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-3 gap-4'>
                  {socialLinks.map((link) => {
                    let Icon = null;
                    switch (link.platform) {
                      case 'github':
                        Icon = FaGithub;
                        break;
                      case 'linkedin':
                        Icon = FaLinkedin;
                        break;
                      case 'x':
                        Icon = FaXTwitter;
                        break;
                      case 'youtube':
                        Icon = FaYoutube;
                        break;
                      case 'instagram':
                        Icon = FaInstagram;
                        break;
                      case 'facebook':
                        Icon = FaFacebook;
                        break;
                      default:
                        Icon = ExternalLink;
                    }
                    return (
                      <Link
                        key={link.platform}
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors'
                      >
                        <Icon className='h-6 w-6' />
                        <span className='text-xs'>
                          {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {about.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className='space-y-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl font-bold mb-8 flex items-center gap-2'>
            <Briefcase className='h-8 w-8' />
            Professional Experience
          </h2>
          <ExperienceTimeline experiences={experiences} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl font-bold mb-8 flex items-center gap-2'>
            <GraduationCap className='h-8 w-8' />
            Education
          </h2>
          <EducationTimeline education={educations} />
        </motion.div>

        {certificates && certificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl font-bold mb-8 flex items-center gap-2'>
              <Award className='h-8 w-8' />
              Certifications & Achievements
            </h2>
            <CertificationShowcase certifications={certificates} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='bg-muted/50 rounded-lg p-8 text-center'
        >
          <h2 className='text-2xl font-bold mb-4'>Let's Work Together</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto mb-6'>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Button asChild>
            <Link href='/#contact'>Get In Touch</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
