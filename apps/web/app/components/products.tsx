'use client';

import type React from 'react';

import { Badge } from '@wb/ui/components/badge';
import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';

// Define the SaaS product type
interface SaasProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  status: 'live' | 'beta' | 'coming-soon';
  pricing: string;
  users: string;
  techStack: string[];
  website: string;
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

// Sample SaaS products data
const saasProducts: SaasProduct[] = [
  {
    id: '1',
    name: 'TaskFlow Pro',
    description:
      'A comprehensive project management and team collaboration platform designed for modern teams.',
    shortDescription:
      'Project management and team collaboration platform for modern teams.',
    features: [
      'Real-time collaboration',
      'Advanced analytics',
      'Custom workflows',
      'API integrations',
    ],
    status: 'live',
    pricing: 'Starting at $9/month',
    users: '10K+',
    techStack: ['Next.js', 'PostgreSQL', 'Redis', 'Stripe'],
    website: 'https://taskflow-pro.example.com',
    metrics: [
      {
        label: 'Active Users',
        value: '10K+',
        icon: <Users className='h-4 w-4' />,
      },
      {
        label: 'Tasks Completed',
        value: '500K+',
        icon: <Zap className='h-4 w-4' />,
      },
      {
        label: 'Growth Rate',
        value: '25%',
        icon: <TrendingUp className='h-4 w-4' />,
      },
    ],
  },
  {
    id: '2',
    name: 'AnalyticsDash',
    description:
      'Powerful analytics dashboard that helps businesses make data-driven decisions with beautiful visualizations.',
    shortDescription: 'Analytics dashboard for data-driven business decisions.',
    features: [
      'Real-time data',
      'Custom dashboards',
      'Export reports',
      'Team sharing',
    ],
    status: 'live',
    pricing: 'Starting at $19/month',
    users: '5K+',
    techStack: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    website: 'https://analytics-dash.example.com',
    metrics: [
      {
        label: 'Active Users',
        value: '5K+',
        icon: <Users className='h-4 w-4' />,
      },
      {
        label: 'Data Points',
        value: '10M+',
        icon: <Zap className='h-4 w-4' />,
      },
      {
        label: 'Uptime',
        value: '99.9%',
        icon: <TrendingUp className='h-4 w-4' />,
      },
    ],
  },
  {
    id: '3',
    name: 'CodeReview AI',
    description:
      'AI-powered code review tool that helps developers write better code and catch bugs before deployment.',
    shortDescription: 'AI-powered code review tool for better code quality.',
    features: [
      'AI code analysis',
      'Security scanning',
      'Performance insights',
      'Team integration',
    ],
    status: 'beta',
    pricing: 'Free during beta',
    users: '2K+',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    website: 'https://codereview-ai.example.com',
    metrics: [
      {
        label: 'Beta Users',
        value: '2K+',
        icon: <Users className='h-4 w-4' />,
      },
      {
        label: 'Code Reviews',
        value: '50K+',
        icon: <Zap className='h-4 w-4' />,
      },
      {
        label: 'Bugs Caught',
        value: '15K+',
        icon: <TrendingUp className='h-4 w-4' />,
      },
    ],
  },
  {
    id: '4',
    name: 'SocialSync',
    description:
      'Social media management platform that helps businesses manage multiple social accounts from one dashboard.',
    shortDescription: 'Social media management platform for businesses.',
    features: [
      'Multi-platform posting',
      'Analytics',
      'Content scheduling',
      'Team collaboration',
    ],
    status: 'coming-soon',
    pricing: 'Coming Q1 2024',
    users: 'Waitlist: 1K+',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
    website: 'https://social-sync.example.com',
    metrics: [
      { label: 'Waitlist', value: '1K+', icon: <Users className='h-4 w-4' /> },
      {
        label: 'Launch',
        value: 'Q1 2024',
        icon: <Rocket className='h-4 w-4' />,
      },
      { label: 'Features', value: '50+', icon: <Zap className='h-4 w-4' /> },
    ],
  },
];

// Product card component
function ProductCard({ product }: { product: SaasProduct }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500';
      case 'beta':
        return 'bg-yellow-500';
      case 'coming-soon':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'beta':
        return 'Beta';
      case 'coming-soon':
        return 'Coming Soon';
      default:
        return 'Unknown';
    }
  };

  return (
    <Link
      href={product.website}
      target='_blank'
      rel='noopener noreferrer'
      className='group'
    >
      <Card className='hover:border-primary/50 flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:scale-[1.02] hover:shadow-lg'>
        <CardHeader className='pb-3'>
          <div className='mb-2 flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <div
                className={`h-3 w-3 rounded-full ${getStatusColor(
                  product.status
                )}`}
              ></div>
              <Badge variant='outline' className='text-xs'>
                {getStatusText(product.status)}
              </Badge>
            </div>
            <ExternalLink className='text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
          </div>
          <CardTitle className='group-hover:text-primary text-xl transition-colors'>
            {product.name}
          </CardTitle>
          <CardDescription className='line-clamp-2'>
            {product.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-grow space-y-4'>
          <div className='grid grid-cols-3 gap-2'>
            {product.metrics.map((metric, index) => (
              <div
                key={index}
                className='bg-muted/50 rounded-lg p-2 text-center'
              >
                <div className='text-primary mb-1 flex justify-center'>
                  {metric.icon}
                </div>
                <div className='text-sm font-semibold'>{metric.value}</div>
                <div className='text-muted-foreground text-xs'>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <div className='space-y-2'>
            <p className='text-sm font-medium'>Key Features:</p>
            <div className='flex flex-wrap gap-1'>
              {product.features.slice(0, 3).map((feature) => (
                <Badge key={feature} variant='secondary' className='text-xs'>
                  {feature}
                </Badge>
              ))}
              {product.features.length > 3 && (
                <Badge variant='outline' className='text-xs'>
                  +{product.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className='pt-0'>
          <div className='w-full text-center'>
            <p className='text-primary text-sm font-medium'>
              {product.pricing}
            </p>
            <p className='text-muted-foreground text-xs'>{product.users}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function Products() {
  return (
    <section
      id='products'
      className='bg-muted/30 container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-32'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 space-y-4 text-center'
      >
        <h2 className='text-3xl font-bold md:text-4xl'>My Products</h2>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          Explore the SaaS products I've built to solve real-world problems and
          help businesses grow.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {saasProducts.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <div className='mt-8 flex justify-center'>
        <Button asChild>
          <Link href='/products'>View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
