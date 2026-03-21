'use client';

import { Award, ExternalLink, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Certificate } from '@/types/portfolio-types';

interface CertificationShowcaseProps {
  certifications: Certificate[];
}

export default function CertificationShowcase({ certifications }: CertificationShowcaseProps) {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className='group relative'
          >
            {/* Gradient background accent */}
            <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

            {/* Card */}
            <div className='relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden'>
              {/* Top accent line */}
              <div className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/50 to-transparent'></div>

              {/* Header with icon */}
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-start gap-3 flex-1'>
                  <div className='mt-1 p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300'>
                    <Award className='h-5 w-5' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-foreground leading-snug text-sm md:text-base group-hover:text-primary transition-colors'>
                      {cert.title}
                    </h3>
                    <p className='text-xs md:text-sm text-muted-foreground mt-1 flex items-center gap-1'>
                      <Star className='h-3 w-3' />
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className='h-px bg-border my-3 group-hover:bg-primary/20 transition-colors'></div>

              {/* Details and action */}
              <div className='flex items-center justify-between gap-2'>
                <span className='text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full'>
                  {cert.issueDate}
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  asChild
                  className='gap-1.5 h-8 px-3 text-xs font-medium text-primary hover:bg-primary/10 hover:text-primary'
                >
                  <Link href={cert.verifyUrl} target='_blank' rel='noopener noreferrer'>
                    Verify
                    <ExternalLink className='h-3.5 w-3.5' />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
