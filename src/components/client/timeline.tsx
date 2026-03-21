'use client';

import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

export interface TimelineItem {
  title: string;
  subtitle?: string;
  period: string;
  content: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} id={String(index + 1)} className='relative flex scroll-mt-18 justify-end gap-2'>
          {/* Sticky header - Desktop only */}
          <div className='sticky top-19 flex w-36 flex-col items-end gap-2 self-start pb-4 max-md:hidden'>
            <Badge className='flex size-6 w-auto justify-end rounded-sm text-sm font-medium'>{item.period}</Badge>
            {item.subtitle && (
              <div className='text-muted-foreground text-right text-sm font-medium'>{item.subtitle}</div>
            )}
          </div>

          {/* Timeline center with dot and line */}
          <div className='flex flex-col items-center'>
            <div className='sticky top-19 flex size-6 items-center justify-center max-md:top-5'>
              <span className='bg-primary/20 flex size-4.5 shrink-0 items-center justify-center rounded-full'>
                <span className='bg-primary size-3 rounded-full' />
              </span>
            </div>
            {index !== items.length - 1 && <span className='-mt-2.5 w-px flex-1 border' />}
          </div>

          {/* Content section */}
          <div className='flex flex-1 flex-col gap-4 pb-11 pl-3 md:pl-6 lg:pl-9'>
            {/* Mobile header */}
            <div className='flex flex-col gap-2 md:hidden'>
              <Badge className='flex rounded-sm font-medium w-fit'>{item.period}</Badge>
            </div>

            {/* Title */}
            <div className='space-y-3'>
              <h3 className='text-xl font-semibold'>{item.title}</h3>
            </div>

            {/* Content */}
            {item.content}
          </div>
        </div>
      ))}
    </>
  );
};

export default Timeline;
