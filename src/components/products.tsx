'use client';

import { ExternalLink, Rocket, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
    description: 'A comprehensive project management and team collaboration platform designed for modern teams.',
    shortDescription: 'Project management and team collaboration platform for modern teams.',
    features: ['Real-time collaboration', 'Advanced analytics', 'Custom workflows', 'API integrations'],
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
    features: ['Real-time data', 'Custom dashboards', 'Export reports', 'Team sharing'],
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
    features: ['AI code analysis', 'Security scanning', 'Performance insights', 'Team integration'],
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
    features: ['Multi-platform posting', 'Analytics', 'Content scheduling', 'Team collaboration'],
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
    <Link href={product.website} target='_blank' rel='noopener noreferrer' className='group'>
      <Card className='h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02]'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between mb-2'>
            <div className='flex items-center gap-2'>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(product.status)}`}></div>
              <Badge variant='outline' className='text-xs'>
                {getStatusText(product.status)}
              </Badge>
            </div>
            <ExternalLink className='h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground' />
          </div>
          <CardTitle className='text-xl group-hover:text-primary transition-colors'>{product.name}</CardTitle>
          <CardDescription className='line-clamp-2'>{product.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className='grow space-y-4'>
          <div className='grid grid-cols-3 gap-2'>
            {product.metrics.map((metric, index) => (
              <div key={index} className='text-center p-2 bg-muted/50 rounded-lg'>
                <div className='flex justify-center mb-1 text-primary'>{metric.icon}</div>
                <div className='text-sm font-semibold'>{metric.value}</div>
                <div className='text-xs text-muted-foreground'>{metric.label}</div>
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
            <p className='text-sm font-medium text-primary'>{product.pricing}</p>
            <p className='text-xs text-muted-foreground'>{product.users}</p>
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
      className='container max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 lg:py-32 bg-muted/30'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-12'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>My Products</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Explore the SaaS products I've built to solve real-world problems and help businesses grow.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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

      <div className='flex justify-center mt-8'>
        <Button asChild>
          <Link href='/products'>View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
