'use client';

import { ArrowLeft, CheckCircle2, CreditCard, Github, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Define the plan types and prices
const plans = {
  basic: { name: 'Basic', price: 49 },
  professional: { name: 'Professional', price: 99 },
  enterprise: { name: 'Enterprise', price: 249 },
};

type AuthState = 'unauthenticated' | 'authenticating' | 'authenticated';
type CheckoutStep = 'login' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'basic';
  const plan = plans[planId as keyof typeof plans] || plans.basic;

  const [authState, setAuthState] = useState<AuthState>('unauthenticated');
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);
  const [step, setStep] = useState<CheckoutStep>('login');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });

  // Simulate GitHub OAuth login
  const handleGitHubLogin = () => {
    setAuthState('authenticating');

    // Simulate API call delay
    setTimeout(() => {
      setAuthState('authenticated');
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '/placeholder.svg?height=50&width=50',
      });
      setStep('payment');
    }, 1500);
  };

  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 2000);
  };

  // Handle input change for payment form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='container py-12 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24 max-w-4xl'>
      <div className='flex items-center gap-4 mb-8'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/theme/pricing'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Pricing
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Checkout</h1>
      </div>

      {/* Checkout Steps */}
      <div className='flex justify-between mb-8 relative'>
        <div className='absolute top-4 left-0 w-full h-0.5 bg-muted -z-10'></div>
        <div
          className={`flex flex-col items-center gap-2 ${step === 'login' ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'login' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            1
          </div>
          <span className='text-sm font-medium'>Login</span>
        </div>
        <div
          className={`flex flex-col items-center gap-2 ${
            step === 'payment' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            2
          </div>
          <span className='text-sm font-medium'>Payment</span>
        </div>
        <div
          className={`flex flex-col items-center gap-2 ${
            step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            3
          </div>
          <span className='text-sm font-medium'>Confirmation</span>
        </div>
      </div>

      {/* Login Step */}
      {step === 'login' && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card>
            <CardHeader>
              <CardTitle>Sign in to continue</CardTitle>
              <CardDescription>Create an account or sign in to complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className='w-full flex items-center gap-2'
                onClick={handleGitHubLogin}
                disabled={authState === 'authenticating'}
              >
                <Github className='h-4 w-4' />
                {authState === 'authenticating' ? 'Signing in...' : 'Sign in with GitHub'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{plan.name} Plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>${plan.price}.00</span>
                </div>
                <Separator />
                <div className='flex justify-between font-bold'>
                  <span>Total</span>
                  <span>${plan.price}.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Step */}
      {step === 'payment' && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-4 mb-4'>
                {user?.avatar && (
                  <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                    <Image src={user.avatar || '/placeholder.svg'} alt={user.name} fill className='object-cover' />
                  </div>
                )}
                <div>
                  <p className='font-medium'>{user?.name}</p>
                  <p className='text-sm text-muted-foreground'>{user?.email}</p>
                </div>
              </div>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information to complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='cardName'>Name on Card</Label>
                  <Input
                    id='cardName'
                    name='cardName'
                    placeholder='John Doe'
                    required
                    value={paymentDetails.cardName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='cardNumber'>Card Number</Label>
                  <Input
                    id='cardNumber'
                    name='cardNumber'
                    placeholder='4242 4242 4242 4242'
                    required
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='expiry'>Expiry Date</Label>
                    <Input
                      id='expiry'
                      name='expiry'
                      placeholder='MM/YY'
                      required
                      value={paymentDetails.expiry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cvc'>CVC</Label>
                    <Input
                      id='cvc'
                      name='cvc'
                      placeholder='123'
                      required
                      value={paymentDetails.cvc}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className='flex items-center text-sm text-muted-foreground gap-2 mt-4'>
                  <Lock className='h-4 w-4' />
                  <span>Your payment information is secure and encrypted</span>
                </div>
                <Button type='submit' className='w-full' disabled={isProcessing}>
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className='mr-2 h-4 w-4' />
                      Pay ${plan.price}.00
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{plan.name} Plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>${plan.price}.00</span>
                </div>
                <Separator />
                <div className='flex justify-between font-bold'>
                  <span>Total</span>
                  <span>${plan.price}.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Confirmation Step */}
      {step === 'confirmation' && (
        <Card className='max-w-xl mx-auto'>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <CheckCircle2 className='h-16 w-16 text-green-500' />
            </div>
            <CardTitle className='text-2xl'>Thank You for Your Purchase!</CardTitle>
            <CardDescription>Your order has been successfully processed.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='bg-muted/50 p-4 rounded-lg'>
              <div className='flex justify-between mb-2'>
                <span className='font-medium'>Order Number:</span>
                <span>ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className='flex justify-between mb-2'>
                <span className='font-medium'>Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className='flex justify-between mb-2'>
                <span className='font-medium'>Total:</span>
                <span>${plan.price}.00</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Payment Method:</span>
                <span>Credit Card</span>
              </div>
            </div>

            <div>
              <h3 className='font-medium mb-2'>What's Next?</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>You'll receive an email with your purchase details and download instructions.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>You can access your purchase from your account dashboard at any time.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>If you have any questions, please contact our support team.</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button className='w-full' asChild>
              <Link href='/theme/dashboard'>Go to Dashboard</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/'>Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
