'use client';

import type React from 'react';

import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaX, FaYoutube } from 'react-icons/fa6';

// Define the platform type
interface PlatformStat {
  name: string;
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}

// Sample platform stats data
const platformStats: PlatformStat[] = [
  {
    name: 'YouTube',
    icon: <FaYoutube className='h-5 w-5' />,
    value: '25.4K',
    label: 'Subscribers',
    color: 'bg-red-500',
  },
  {
    name: 'GitHub',
    icon: <FaGithub className='h-5 w-5' />,
    value: '12.5K',
    label: 'Stars',
    color: 'bg-gray-800',
  },
  {
    name: 'Twitter',
    icon: <FaX className='h-5 w-5' />,
    value: '18.7K',
    label: 'Followers',
    color: 'bg-sky-500',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className='h-5 w-5' />,
    value: '7.2K',
    label: 'Followers',
    color: 'bg-blue-600',
  },
];

export default function GrowthSection() {
  return (
    <section
      id='growth'
      className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 space-y-4 text-center'
      >
        <h2 className='text-3xl font-bold md:text-4xl'>My Growth</h2>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          Track my growth and impact across various platforms in the developer
          community.
        </p>
      </motion.div>

      <div className='mb-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {platformStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className='h-full'>
              <CardHeader className='pb-2'>
                <div className={`${stat.color} w-fit rounded p-1.5 text-white`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className='text-2xl'>{stat.value}</CardTitle>
                <p className='text-muted-foreground text-sm'>
                  {stat.label} on {stat.name}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className='flex justify-center'>
        <Button asChild>
          <Link href='/growth'>
            <TrendingUp className='mr-2 h-4 w-4' />
            View All Statistics
          </Link>
        </Button>
      </div>
    </section>
  );
}
