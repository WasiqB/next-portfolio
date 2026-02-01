'use client';

import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-transform duration-300 ease-out'
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-transform duration-300 ease-out'
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
      </div>

      <div className='relative z-10 text-center max-w-2xl mx-auto'>
        {/* Animated 404 number */}
        <div className='relative mb-8'>
          <h1
            className='text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-b from-primary/20 to-primary/5 leading-none select-none'
            style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
          >
            404
          </h1>
          <div className='absolute inset-0 flex items-center justify-center'>
            <FileQuestion
              className='w-20 h-20 md:w-28 md:h-28 text-primary animate-pulse'
              style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
            />
          </div>
        </div>

        {/* Error message */}
        <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>Page Not Found</h2>
        <p className='text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed'>
          Oops! The page you are looking for seems to have wandered off. It might have been moved, deleted, or never
          existed.
        </p>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <Button asChild size='lg' className='gap-2'>
            <Link href='/'>
              <Home className='w-4 h-4' />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant='outline' size='lg' className='gap-2 bg-transparent'>
            <Link href='/'>
              <ArrowLeft className='w-4 h-4' />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className='border-t border-border pt-8'>
          <p className='text-sm text-muted-foreground mb-4'>Here are some helpful links instead:</p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/projects'
              className='text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline'
            >
              Projects
            </Link>
            <span className='text-muted-foreground/50'>|</span>
            <Link
              href='/blogs'
              className='text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline'
            >
              Blogs
            </Link>
            <span className='text-muted-foreground/50'>|</span>
            <Link
              href='/about'
              className='text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline'
            >
              About
            </Link>
            <span className='text-muted-foreground/50'>|</span>
            <Link
              href='/#contact'
              className='text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline'
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Fun element - floating particles */}
        <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 bg-primary/20 rounded-full animate-float'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
