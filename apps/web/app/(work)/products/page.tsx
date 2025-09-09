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
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Globe,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

// Define the SaaS product type
interface Product {
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
  github?: string;
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

// Sample SaaS products data
const saasProducts: Product[] = [
  {
    id: '1',
    name: 'TaskFlow Pro',
    description:
      "A comprehensive project management and team collaboration platform designed for modern teams. TaskFlow Pro combines powerful project tracking, real-time collaboration, and advanced analytics to help teams stay organized and productive. With custom workflows, integrations, and detailed reporting, it's the perfect solution for teams of all sizes.",
    shortDescription:
      'Project management and team collaboration platform for modern teams.',
    features: [
      'Real-time collaboration',
      'Advanced analytics',
      'Custom workflows',
      'API integrations',
      'Time tracking',
      'Team chat',
      'File sharing',
      'Mobile apps',
    ],
    status: 'live',
    pricing: 'Starting at $9/month',
    users: '10K+',
    techStack: [
      'Next.js',
      'PostgreSQL',
      'Redis',
      'Stripe',
      'WebSocket',
      'Docker',
    ],
    website: 'https://taskflow-pro.example.com',
    github: 'https://github.com/johndoe/taskflow-pro',
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
      'Powerful analytics dashboard that helps businesses make data-driven decisions with beautiful visualizations and real-time insights. Connect multiple data sources, create custom dashboards, and share insights with your team. Perfect for marketing teams, product managers, and executives who need to track KPIs and performance metrics.',
    shortDescription: 'Analytics dashboard for data-driven business decisions.',
    features: [
      'Real-time data',
      'Custom dashboards',
      'Export reports',
      'Team sharing',
      'Data connectors',
      'Alerts',
      'Mobile responsive',
      'White-label options',
    ],
    status: 'live',
    pricing: 'Starting at $19/month',
    users: '5K+',
    techStack: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Elasticsearch', 'AWS'],
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
      'AI-powered code review tool that helps developers write better code and catch bugs before deployment. Using advanced machine learning algorithms, CodeReview AI analyzes your code for potential issues, security vulnerabilities, and performance optimizations. Integrates seamlessly with popular version control systems and CI/CD pipelines.',
    shortDescription: 'AI-powered code review tool for better code quality.',
    features: [
      'AI code analysis',
      'Security scanning',
      'Performance insights',
      'Team integration',
      'CI/CD integration',
      'Custom rules',
      'Multi-language support',
      'Detailed reports',
    ],
    status: 'beta',
    pricing: 'Free during beta',
    users: '2K+',
    techStack: [
      'Python',
      'TensorFlow',
      'FastAPI',
      'Docker',
      'Kubernetes',
      'PostgreSQL',
    ],
    website: 'https://codereview-ai.example.com',
    github: 'https://github.com/johndoe/codereview-ai',
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
      'Social media management platform that helps businesses manage multiple social accounts from one dashboard. Schedule posts, analyze performance, engage with followers, and collaborate with team members. SocialSync supports all major social platforms and provides detailed analytics to help you grow your social media presence.',
    shortDescription: 'Social media management platform for businesses.',
    features: [
      'Multi-platform posting',
      'Analytics',
      'Content scheduling',
      'Team collaboration',
      'Content calendar',
      'Hashtag suggestions',
      'Competitor analysis',
      'Automated responses',
    ],
    status: 'coming-soon',
    pricing: 'Coming Q1 2024',
    users: 'Waitlist: 1K+',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'AWS', 'Elasticsearch'],
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
  {
    id: '5',
    name: 'EmailCraft',
    description:
      'Advanced email marketing platform with drag-and-drop editor, automation workflows, and detailed analytics. Create beautiful email campaigns, set up automated sequences, and track performance with comprehensive reporting. Perfect for businesses looking to grow their email marketing efforts.',
    shortDescription: 'Email marketing platform with automation and analytics.',
    features: [
      'Drag-drop editor',
      'Automation workflows',
      'A/B testing',
      'Segmentation',
      'Analytics',
      'Templates',
      'API access',
      'Integrations',
    ],
    status: 'live',
    pricing: 'Starting at $15/month',
    users: '8K+',
    techStack: ['Angular', 'Node.js', 'PostgreSQL', 'Redis', 'SendGrid', 'AWS'],
    website: 'https://emailcraft.example.com',
    metrics: [
      {
        label: 'Active Users',
        value: '8K+',
        icon: <Users className='h-4 w-4' />,
      },
      {
        label: 'Emails Sent',
        value: '50M+',
        icon: <Zap className='h-4 w-4' />,
      },
      {
        label: 'Open Rate',
        value: '28%',
        icon: <TrendingUp className='h-4 w-4' />,
      },
    ],
  },
  {
    id: '6',
    name: 'InvoiceFlow',
    description:
      'Simple yet powerful invoicing and billing software for freelancers and small businesses. Create professional invoices, track payments, manage clients, and generate financial reports. With automated reminders and multiple payment options, getting paid has never been easier.',
    shortDescription:
      'Invoicing and billing software for freelancers and small businesses.',
    features: [
      'Invoice creation',
      'Payment tracking',
      'Client management',
      'Reports',
      'Automated reminders',
      'Multiple currencies',
      'Tax calculations',
      'Mobile app',
    ],
    status: 'live',
    pricing: 'Starting at $12/month',
    users: '6K+',
    techStack: ['React', 'Express.js', 'MongoDB', 'Stripe', 'PayPal', 'AWS'],
    website: 'https://invoiceflow.example.com',
    metrics: [
      {
        label: 'Active Users',
        value: '6K+',
        icon: <Users className='h-4 w-4' />,
      },
      {
        label: 'Invoices Created',
        value: '200K+',
        icon: <Zap className='h-4 w-4' />,
      },
      {
        label: 'Revenue Processed',
        value: '$10M+',
        icon: <TrendingUp className='h-4 w-4' />,
      },
    ],
  },
];

// Product card component
function ProductCard({ product }: { product: Product }) {
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
    <Card className='flex h-full flex-col overflow-hidden'>
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
          <div className='flex gap-2'>
            {product.github && (
              <Link
                href={product.github}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Github className='text-muted-foreground hover:text-primary h-4 w-4 transition-colors' />
              </Link>
            )}
            <Link
              href={product.website}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Globe className='text-muted-foreground hover:text-primary h-4 w-4 transition-colors' />
            </Link>
          </div>
        </div>
        <CardTitle className='text-xl'>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow space-y-4'>
        <div className='grid grid-cols-3 gap-2'>
          {product.metrics.map((metric, index) => (
            <div key={index} className='bg-muted/50 rounded-lg p-2 text-center'>
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
          <p className='text-sm font-medium'>Features:</p>
          <div className='flex flex-wrap gap-1'>
            {product.features.map((feature) => (
              <Badge key={feature} variant='secondary' className='text-xs'>
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div className='space-y-2'>
          <p className='text-sm font-medium'>Tech Stack:</p>
          <div className='flex flex-wrap gap-1'>
            {product.techStack.map((tech) => (
              <Badge key={tech} variant='outline' className='text-xs'>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-2 pt-0'>
        <div className='w-full text-center'>
          <p className='text-primary text-sm font-medium'>{product.pricing}</p>
          <p className='text-muted-foreground text-xs'>{product.users}</p>
        </div>
        <Button asChild className='w-full'>
          <Link
            href={product.website}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink className='mr-2 h-4 w-4' />
            Visit Website
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProductsPage() {
  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Products</h1>
      </div>

      <div className='mx-auto mb-12 max-w-3xl'>
        <p className='text-muted-foreground text-lg'>
          I've built several SaaS products that solve real-world problems for
          businesses and developers. Each product is designed with user
          experience in mind and built using modern technologies for scalability
          and performance.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {saasProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className='bg-muted/50 mt-16 rounded-lg p-8 text-center'>
        <h2 className='mb-4 text-2xl font-bold'>
          Have an Idea for a SaaS Product?
        </h2>
        <p className='text-muted-foreground mx-auto mb-6 max-w-2xl'>
          I'm always interested in building new SaaS products that solve real
          problems. If you have an idea or want to collaborate on a project,
          let's discuss it!
        </p>
        <Button asChild>
          <Link href='#contact'>Let's Talk</Link>
        </Button>
      </div>
    </div>
  );
}
