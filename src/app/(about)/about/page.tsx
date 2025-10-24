import AboutContent from '@/components/pages/about-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Get to know more about Wasiq Bhamla',
};

export default function AboutPage() {
  return <AboutContent />;
}
