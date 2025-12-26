'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutHero() {
  return (
    <section className='container py-12 md:py-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-6'
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
            Hi, I'm <span className='text-primary'>John Doe</span>
          </h1>
          <p className='text-xl text-muted-foreground'>
            A passionate frontend developer specializing in creating beautiful, functional, and user-centered digital
            experiences.
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button size='lg' asChild>
              <Link href='/about'>
                More About Me
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='#contact'>Get In Touch</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='relative'
        >
          <div className='relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg'>
            <Image src='/placeholder.svg?height=500&width=500' alt='John Doe' fill className='object-cover' priority />
          </div>
          <div className='absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg'>
            <div className='flex items-center gap-2 text-sm'>
              <span className='flex h-3 w-3 rounded-full bg-green-500'></span>
              <span>Available for new projects</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
