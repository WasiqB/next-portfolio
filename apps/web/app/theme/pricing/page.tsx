import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Portfolio Theme Pricing</h1>
      </div>

      <div className='mx-auto mb-12 max-w-3xl text-center'>
        <p className='text-muted-foreground text-lg'>
          Get the exact same theme used on this portfolio website for your own
          projects.
        </p>
      </div>

      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3'>
        {/* Basic Plan */}
        <Card className='border-border flex flex-col'>
          <CardHeader>
            <CardTitle className='text-xl'>Basic</CardTitle>
            <CardDescription>For personal projects</CardDescription>
            <div className='mt-4'>
              <span className='text-4xl font-bold'>$49</span>
              <span className='text-muted-foreground ml-1'>one-time</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              {[
                'Complete portfolio template',
                'Responsive design',
                'Dark/light mode',
                'Basic components',
                '6 months of updates',
                'Community support',
              ].map((feature) => (
                <li key={feature} className='flex items-start'>
                  <Check className='text-primary mr-2 h-5 w-5 shrink-0' />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className='w-full'>
              <Link href='/theme/checkout?plan=basic'>
                Get Started
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className='border-primary before:bg-primary/5 relative flex flex-col before:absolute before:inset-0 before:-z-10 before:rounded-lg'>
          <div className='absolute top-0 right-0 translate-x-2 -translate-y-2 transform'>
            <span className='bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium'>
              Popular
            </span>
          </div>
          <CardHeader>
            <CardTitle className='text-xl'>Professional</CardTitle>
            <CardDescription>For freelancers & agencies</CardDescription>
            <div className='mt-4'>
              <span className='text-4xl font-bold'>$99</span>
              <span className='text-muted-foreground ml-1'>one-time</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              {[
                'Everything in Basic',
                'Advanced components',
                'Multiple page templates',
                'Custom sections',
                '1 year of updates',
                'Priority support',
                'Use on up to 5 projects',
              ].map((feature) => (
                <li key={feature} className='flex items-start'>
                  <Check className='text-primary mr-2 h-5 w-5 shrink-0' />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className='w-full'>
              <Link href='/theme/checkout?plan=professional'>
                Get Started
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className='border-border flex flex-col'>
          <CardHeader>
            <CardTitle className='text-xl'>Enterprise</CardTitle>
            <CardDescription>For larger organizations</CardDescription>
            <div className='mt-4'>
              <span className='text-4xl font-bold'>$249</span>
              <span className='text-muted-foreground ml-1'>one-time</span>
            </div>
          </CardHeader>
          <CardContent className='flex-grow'>
            <ul className='space-y-2'>
              {[
                'Everything in Professional',
                'Unlimited projects',
                'Custom branding',
                'Advanced integrations',
                'Lifetime updates',
                'Dedicated support',
                '1-hour consultation call',
              ].map((feature) => (
                <li key={feature} className='flex items-start'>
                  <Check className='text-primary mr-2 h-5 w-5 shrink-0' />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className='w-full'>
              <Link href='/theme/checkout?plan=enterprise'>
                Get Started
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className='bg-muted/50 mx-auto mt-16 max-w-4xl rounded-lg p-8'>
        <h2 className='mb-4 text-center text-2xl font-bold'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          <div>
            <h3 className='mb-2 font-semibold'>
              What's included in the theme package?
            </h3>
            <p className='text-muted-foreground'>
              The theme package includes all the source code you see on this
              website, including components, layouts, and pages. You'll receive
              a complete Next.js project that you can customize for your own
              needs.
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold'>
              Can I use this theme for client projects?
            </h3>
            <p className='text-muted-foreground'>
              Yes, with the Professional and Enterprise plans, you can use this
              theme for client projects. The Basic plan is limited to personal
              use only.
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold'>Do you offer refunds?</h3>
            <p className='text-muted-foreground'>
              We offer a 14-day money-back guarantee if you're not satisfied
              with the theme. Simply contact us with your purchase details for a
              full refund.
            </p>
          </div>
          <div>
            <h3 className='mb-2 font-semibold'>How do I get support?</h3>
            <p className='text-muted-foreground'>
              All plans include access to our documentation. Professional and
              Enterprise plans include priority support via email. Enterprise
              customers also get a dedicated support contact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
