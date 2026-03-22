'use client';

import { Building2, ExternalLink, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '@/types/portfolio-types';
import type { TimelineItem } from './timeline';
import Timeline from './timeline';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const getJobTypeColor = (jobType: string) => {
  switch (jobType) {
    case 'on-site':
      return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500';
    case 'remote':
      return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500';
    default:
      return 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500';
  }
};

const getJobModeColor = (jobMode: string) => {
  switch (jobMode) {
    case 'full-time':
      return 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500';
    case 'contract':
      return 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-500';
    default:
      return 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500';
  }
};

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const timelineItems: TimelineItem[] = experiences.map((exp) => ({
    title: exp.title,
    period: exp.period,
    subtitle: exp.company,
    content: (
      <div className='space-y-4'>
        {/* Company and Location */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-sm'>
            <Building2 className='h-4 w-4 shrink-0' />
            {exp.companyUrl ? (
              <Link
                href={exp.companyUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium hover:text-primary hover:underline transition-colors flex items-center gap-1'
              >
                {exp.company}
                <ExternalLink className='h-3 w-3' />
              </Link>
            ) : (
              <span className='font-medium'>{exp.company}</span>
            )}
          </div>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <MapPin className='h-4 w-4 shrink-0' />
            <span>{exp.location}</span>
          </div>
        </div>

        {/* Job type and Industry badges */}
        <div className='flex gap-2 flex-wrap'>
          <Badge className={`${getJobTypeColor(exp.jobType)} border text-xs font-semibold`}>
            {exp.jobType.charAt(0).toUpperCase() + exp.jobType.slice(1)}
          </Badge>
          <Badge className={`${getJobModeColor(exp.jobMode)} border text-xs font-semibold`}>
            {exp.jobMode.charAt(0).toUpperCase() + exp.jobMode.slice(1)}
          </Badge>
          {exp.industries.map((industry, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='text-xs font-semibold bg-gray-500/20 text-gray-700 dark:text-gray-400'
            >
              {industry}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <div>
          <h4 className='text-sm font-semibold text-foreground mb-2'>Key Responsibilities:</h4>
          <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
            {exp.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div>
          <h4 className='text-sm font-semibold text-foreground mb-2'>Technologies Used:</h4>
          <div className='flex flex-wrap gap-2'>
            {exp.skills.map((skill) => (
              <Badge
                key={skill}
                variant='secondary'
                className='border text-xs bg-blue-500/20 text-blue-700 dark:text-blue-400'
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return <Timeline items={timelineItems} />;
}
