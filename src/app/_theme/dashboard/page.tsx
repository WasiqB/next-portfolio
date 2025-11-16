'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileCode, FileText, Github, HelpCircle, MessageSquare } from 'lucide-react';

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
      <div className='container py-12 flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <div className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>My Dashboard</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
        <div className='md:col-span-1'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex flex-col items-center text-center'>
                <div className='relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-muted'>
                  <Image src={user?.avatar || ''} alt={user?.name || ''} fill className='object-cover' />
                </div>
                <h2 className='text-xl font-bold'>{user?.name}</h2>
                <p className='text-sm text-muted-foreground mb-4'>{user?.email}</p>
                <Button variant='outline' size='sm' className='w-full' asChild>
                  <Link href='#'>
                    <Github className='h-4 w-4 mr-2' />
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
                  <CardDescription>Manage your purchased products and licenses</CardDescription>
                </CardHeader>
                <CardContent>
                  {purchases.length > 0 ? (
                    <div className='space-y-6'>
                      {purchases.map((purchase) => (
                        <div key={purchase.id} className='border rounded-lg p-4'>
                          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                            <div>
                              <h3 className='font-medium'>{purchase.product}</h3>
                              <p className='text-sm text-muted-foreground'>
                                Order #{purchase.id} • {new Date(purchase.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant='outline' className='mt-2 md:mt-0 w-fit'>
                              {purchase.status === 'active' ? 'Active' : 'Expired'}
                            </Badge>
                          </div>
                          <div className='bg-muted/50 p-3 rounded-md mb-4'>
                            <div className='flex justify-between text-sm'>
                              <span>License Key:</span>
                              <span className='font-mono'>{purchase.licenseKey}</span>
                            </div>
                          </div>
                          <div className='flex flex-wrap gap-2'>
                            <Button size='sm' variant='outline' asChild>
                              <Link href='#downloads'>
                                <Download className='h-4 w-4 mr-2' />
                                Download Files
                              </Link>
                            </Button>
                            <Button size='sm' variant='outline' asChild>
                              <Link href='#'>
                                <FileText className='h-4 w-4 mr-2' />
                                View Invoice
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-8'>
                      <p className='text-muted-foreground mb-4'>You haven't made any purchases yet.</p>
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
                  <CardDescription>Access your purchased files and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  {downloads.length > 0 ? (
                    <div className='space-y-4'>
                      {downloads.map((download) => (
                        <div key={download.id} className='flex items-center justify-between border-b pb-4'>
                          <div className='flex items-center gap-4'>
                            <div className='bg-muted/50 p-3 rounded-md'>{download.icon}</div>
                            <div>
                              <h3 className='font-medium'>{download.name}</h3>
                              <p className='text-sm text-muted-foreground'>
                                {download.type} • {download.size}
                              </p>
                            </div>
                          </div>
                          <Button size='sm' variant='outline'>
                            <Download className='h-4 w-4 mr-2' />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-8'>
                      <p className='text-muted-foreground mb-4'>No downloads available.</p>
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
                  <CardDescription>Get help with your purchased products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    <div className='bg-muted/50 p-6 rounded-lg'>
                      <div className='flex items-start gap-4'>
                        <HelpCircle className='h-6 w-6 text-primary shrink-0 mt-1' />
                        <div>
                          <h3 className='font-medium mb-2'>Need Help?</h3>
                          <p className='text-muted-foreground mb-4'>
                            Our support team is here to help you with any questions or issues you may have with your
                            purchased products.
                          </p>
                          <Button asChild>
                            <Link href='#'>
                              <MessageSquare className='h-4 w-4 mr-2' />
                              Contact Support
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className='font-medium mb-4'>Documentation & Resources</h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-base'>Getting Started Guide</CardTitle>
                          </CardHeader>
                          <CardContent className='pb-2'>
                            <p className='text-sm text-muted-foreground'>
                              Learn how to set up and customize your portfolio theme.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant='outline' size='sm' className='w-full' asChild>
                              <Link href='#'>
                                <FileText className='h-4 w-4 mr-2' />
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
                            <p className='text-sm text-muted-foreground'>
                              Find answers to commonly asked questions about the theme.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant='outline' size='sm' className='w-full' asChild>
                              <Link href='#'>
                                <HelpCircle className='h-4 w-4 mr-2' />
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
