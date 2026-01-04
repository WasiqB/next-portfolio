import type { Metadata } from 'next';
import SponsorContent from '@/components/pages/sponsor-content';

export const metadata: Metadata = {
  title: 'My Sponsors',
  description: 'My sponsors for my open source project contributions',
};

export default function SponsorsPage() {
  return <SponsorContent />;
}
