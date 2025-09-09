'use client';

import { Data } from '@/app/data/portfolio-data';
import { AboutData } from '@/app/types/portfolio-types';
import { Badge } from '@wb/ui/components/badge';
import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

const about: AboutData = Data.about;

export default function AboutContent() {
  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>About Me</h1>
      </div>

      {/* Mobile profile image - visible only on mobile */}
      <div className='mb-8 md:hidden'>
        <Card>
          <CardContent className='p-0'>
            <div className='relative aspect-square w-full overflow-hidden'>
              <Image
                src={about.profileImage.src}
                alt={about.profileImage.alt}
                fill
                className='object-cover'
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='md:col-span-2'>
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
                <h3 className='mb-2 text-lg font-semibold'>My Core Values</h3>
                <ul className='list-disc space-y-1 pl-6'>
                  {about.coreValues.map((cv, i) => (
                    <li key={i}>
                      <strong>{cv.label}:</strong> {cv.value}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='hidden space-y-8 md:block'>
          <Card>
            <CardContent className='p-0'>
              <div className='relative aspect-square w-full overflow-hidden'>
                <Image
                  src={about.profileImage.src}
                  alt={about.profileImage.alt}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                {about.socialLinks.map((link) => {
                  let Icon = null;
                  switch (link.platform) {
                    case 'github':
                      Icon = FaGithub;
                      break;
                    case 'linkedin':
                      Icon = FaLinkedin;
                      break;
                    case 'twitter':
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
                      className='hover:bg-muted flex flex-col items-center gap-2 rounded-lg p-3 transition-colors'
                    >
                      <Icon className='h-6 w-6' />
                      <span className='text-xs'>
                        {link.platform.charAt(0).toUpperCase() +
                          link.platform.slice(1)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

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
        </div>

        {/* Mobile social links and skills - visible only on mobile */}
        <div className='space-y-8 md:hidden'>
          <Card>
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                {about.socialLinks.map((link) => {
                  let Icon = null;
                  switch (link.platform) {
                    case 'github':
                      Icon = FaGithub;
                      break;
                    case 'linkedin':
                      Icon = FaLinkedin;
                      break;
                    case 'twitter':
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
                      className='hover:bg-muted flex flex-col items-center gap-2 rounded-lg p-3 transition-colors'
                    >
                      <Icon className='h-6 w-6' />
                      <span className='text-xs'>
                        {link.platform.charAt(0).toUpperCase() +
                          link.platform.slice(1)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

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
        </div>
      </div>

      <div className='space-y-12'>
        <div>
          <h2 className='mb-6 text-2xl font-bold'>Professional Experience</h2>
          <div className='border-muted relative ml-3 border-l pl-6'>
            {about.experiences.map((experience, index) => (
              <div key={index} className='relative mb-10'>
                {/* Timeline dot */}
                <div className='bg-primary border-background absolute top-1.5 -left-[30px] h-4 w-4 rounded-full border-4'></div>

                {/* Content */}
                <div className='bg-card rounded-lg border p-5 shadow-sm transition-shadow hover:shadow-md'>
                  <div className='mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                    <div>
                      <h3 className='text-xl font-semibold'>
                        {experience.title}
                      </h3>
                      <p className='text-muted-foreground'>
                        {experience.company} • {experience.location}
                      </p>
                    </div>
                    <div className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium'>
                      {experience.period}
                    </div>
                  </div>

                  <ul className='text-muted-foreground mb-4 list-disc space-y-1 pl-6'>
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className='flex flex-wrap gap-2'>
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant='secondary'>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='mb-6 text-2xl font-bold'>Education</h2>
          <div className='border-muted relative ml-3 border-l pl-6'>
            {about.education.map((edu, index) => (
              <div key={index} className='relative mb-10'>
                {/* Timeline dot */}
                <div className='bg-primary border-background absolute top-1.5 -left-[30px] h-4 w-4 rounded-full border-4'></div>

                {/* Content */}
                <div className='bg-card rounded-lg border p-5 shadow-sm transition-shadow hover:shadow-md'>
                  <div className='mb-2 flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                    <div>
                      <h3 className='text-xl font-semibold'>{edu.degree}</h3>
                      <p className='text-muted-foreground'>
                        {edu.institution} • {edu.location}
                      </p>
                    </div>
                    <div className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium'>
                      {edu.period}
                    </div>
                  </div>

                  {edu.description && (
                    <p className='text-muted-foreground'>{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {about.certifications && (
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Certifications</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {about.certifications.map((cert, idx) => (
                <Card key={cert.title + idx}>
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground text-sm'>
                        Issued: {cert.issued}
                      </span>
                      {cert.verifyUrl && (
                        <Button variant='outline' size='sm' asChild>
                          <Link
                            href={cert.verifyUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='mr-2 h-4 w-4' />
                            Verify
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className='bg-muted/50 rounded-lg p-8 text-center'>
          <h2 className='mb-4 text-2xl font-bold'>Let's Work Together</h2>
          <p className='text-muted-foreground mx-auto mb-6 max-w-2xl'>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Button asChild>
            <Link href='/#contact'>Get In Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
