'use client';

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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@wb/ui/components/tabs';
import {
  ArrowLeft,
  Download,
  FileCode,
  FileText,
  Github,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
};

// Mock purchase data
const mockPurchases = [
  {
    id: 'ORD-123456',
    date: '2023-05-15',
    product: 'Portfolio Theme - Professional',
    price: 99,
    status: 'active',
    licenseKey: 'PRO-XXXX-XXXX-XXXX',
  },
];

// Mock download items
const mockDownloads = [
  {
    id: '1',
    name: 'Portfolio Theme v1.0.0',
    type: 'Source Code',
    size: '4.2 MB',
    date: '2023-05-15',
    icon: <FileCode className='h-6 w-6' />,
  },
  {
    id: '2',
    name: 'Documentation',
    type: 'PDF',
    size: '1.8 MB',
    date: '2023-05-15',
    icon: <FileText className='h-6 w-6' />,
  },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [purchases, setPurchases] = useState<typeof mockPurchases>([]);
  const [downloads, setDownloads] = useState<typeof mockDownloads>([]);

  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      setUser(mockUser);
      setPurchases(mockPurchases);
      setDownloads(mockDownloads);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className='container flex min-h-[60vh] items-center justify-center py-12'>
        <div className='text-center'>
          <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'></div>
          <p className='text-muted-foreground'>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Dashboard</h1>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-4'>
        <div className='md:col-span-1'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex flex-col items-center text-center'>
                <div className='border-muted relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2'>
                  <Image
                    src={user?.avatar || ''}
                    alt={user?.name || ''}
                    fill
                    className='object-cover'
                  />
                </div>
                <h2 className='text-xl font-bold'>{user?.name}</h2>
                <p className='text-muted-foreground mb-4 text-sm'>
                  {user?.email}
                </p>
                <Button variant='outline' size='sm' className='w-full' asChild>
                  <Link href='#'>
                    <Github className='mr-2 h-4 w-4' />
                    Manage Account
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='md:col-span-3'>
          <Tabs defaultValue='purchases'>
            <TabsList className='mb-6'>
              <TabsTrigger value='purchases'>My Purchases</TabsTrigger>
              <TabsTrigger value='downloads'>Downloads</TabsTrigger>
              <TabsTrigger value='support'>Support</TabsTrigger>
            </TabsList>

            <TabsContent value='purchases'>
              <Card>
                <CardHeader>
                  <CardTitle>Your Purchases</CardTitle>
                  <CardDescription>
                    Manage your purchased products and licenses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchases.length > 0 ? (
                    <div className='space-y-6'>
                      {purchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className='rounded-lg border p-4'
                        >
                          <div className='mb-4 flex flex-col md:flex-row md:items-center md:justify-between'>
                            <div>
                              <h3 className='font-medium'>
                                {purchase.product}
                              </h3>
                              <p className='text-muted-foreground text-sm'>
                                Order #{purchase.id} •{' '}
                                {new Date(purchase.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant='outline'
                              className='mt-2 w-fit md:mt-0'
                            >
                              {purchase.status === 'active'
                                ? 'Active'
                                : 'Expired'}
                            </Badge>
                          </div>
                          <div className='bg-muted/50 mb-4 rounded-md p-3'>
                            <div className='flex justify-between text-sm'>
                              <span>License Key:</span>
                              <span className='font-mono'>
                                {purchase.licenseKey}
                              </span>
                            </div>
                          </div>
                          <div className='flex flex-wrap gap-2'>
                            <Button size='sm' variant='outline' asChild>
                              <Link href='#downloads'>
                                <Download className='mr-2 h-4 w-4' />
                                Download Files
                              </Link>
                            </Button>
                            <Button size='sm' variant='outline' asChild>
                              <Link href='#'>
                                <FileText className='mr-2 h-4 w-4' />
                                View Invoice
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='py-8 text-center'>
                      <p className='text-muted-foreground mb-4'>
                        You haven't made any purchases yet.
                      </p>
                      <Button asChild>
                        <Link href='/theme/pricing'>Browse Products</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='downloads' id='downloads'>
              <Card>
                <CardHeader>
                  <CardTitle>Downloads</CardTitle>
                  <CardDescription>
                    Access your purchased files and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {downloads.length > 0 ? (
                    <div className='space-y-4'>
                      {downloads.map((download) => (
                        <div
                          key={download.id}
                          className='flex items-center justify-between border-b pb-4'
                        >
                          <div className='flex items-center gap-4'>
                            <div className='bg-muted/50 rounded-md p-3'>
                              {download.icon}
                            </div>
                            <div>
                              <h3 className='font-medium'>{download.name}</h3>
                              <p className='text-muted-foreground text-sm'>
                                {download.type} • {download.size}
                              </p>
                            </div>
                          </div>
                          <Button size='sm' variant='outline'>
                            <Download className='mr-2 h-4 w-4' />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='py-8 text-center'>
                      <p className='text-muted-foreground mb-4'>
                        No downloads available.
                      </p>
                      <Button asChild>
                        <Link href='/theme/pricing'>Browse Products</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='support'>
              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>
                    Get help with your purchased products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    <div className='bg-muted/50 rounded-lg p-6'>
                      <div className='flex items-start gap-4'>
                        <HelpCircle className='text-primary mt-1 h-6 w-6 shrink-0' />
                        <div>
                          <h3 className='mb-2 font-medium'>Need Help?</h3>
                          <p className='text-muted-foreground mb-4'>
                            Our support team is here to help you with any
                            questions or issues you may have with your purchased
                            products.
                          </p>
                          <Button asChild>
                            <Link href='#'>
                              <MessageSquare className='mr-2 h-4 w-4' />
                              Contact Support
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className='mb-4 font-medium'>
                        Documentation & Resources
                      </h3>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-base'>
                              Getting Started Guide
                            </CardTitle>
                          </CardHeader>
                          <CardContent className='pb-2'>
                            <p className='text-muted-foreground text-sm'>
                              Learn how to set up and customize your portfolio
                              theme.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant='outline'
                              size='sm'
                              className='w-full'
                              asChild
                            >
                              <Link href='#'>
                                <FileText className='mr-2 h-4 w-4' />
                                View Guide
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-base'>FAQ</CardTitle>
                          </CardHeader>
                          <CardContent className='pb-2'>
                            <p className='text-muted-foreground text-sm'>
                              Find answers to commonly asked questions about the
                              theme.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant='outline'
                              size='sm'
                              className='w-full'
                              asChild
                            >
                              <Link href='#'>
                                <HelpCircle className='mr-2 h-4 w-4' />
                                View FAQ
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
