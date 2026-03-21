'use client';

import { Building2, MapPin } from 'lucide-react';
import type { Education } from '@/types/portfolio-types';
import type { TimelineItem } from './timeline';
import Timeline from './timeline';

interface EducationTimelineProps {
  education: Education[];
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
  const timelineItems: TimelineItem[] = education.map((edu) => ({
    title: edu.title,
    period: edu.period,
    subtitle: edu.university,
    content: (
      <div className='space-y-4'>
        {/* Institution and Location */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-sm font-medium'>
            <Building2 className='h-4 w-4 shrink-0' />
            <span>{edu.university}</span>
          </div>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <MapPin className='h-4 w-4 shrink-0' />
            <span>{edu.location}</span>
          </div>
        </div>

        {/* Description */}
        {edu.description && <p className='text-sm text-muted-foreground leading-relaxed'>{edu.description}</p>}
      </div>
    ),
  }));

  return <Timeline items={timelineItems} />;
}
