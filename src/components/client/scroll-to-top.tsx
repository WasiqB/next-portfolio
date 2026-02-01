'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg cursor-pointer',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'h-12 w-12 p-0 transition-all duration-300 ease-in-out',
        'hover:scale-110 hover:shadow-xl',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none',
      )}
      size='icon'
      aria-label='Scroll to top'
    >
      <ArrowUp className='h-5 w-5' />
    </Button>
  );
}
