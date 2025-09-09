'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@wb/ui/components/button';
import { Card, CardContent } from '@wb/ui/components/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@wb/ui/components/form';
import { Input } from '@wb/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@wb/ui/components/select';
import { toast } from '@wb/ui/components/sonner';
import { Textarea } from '@wb/ui/components/textarea';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageCircleQuestion,
  MessageSquare,
  Send,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  reason: z.string().min(1, 'Please select a reason for contact'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      reason: '',
      message: '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { sectionTitle, sectionDescription, reasons } = portfolioData.contact;

  useEffect(() => {
    if (formError) {
      toast.error(formError, {
        duration: 5000,
        description: 'Please check your input and try again.',
      });
    }
  }, [formError]);

  useEffect(() => {
    if (formSuccess) {
      toast.success('Message sent successfully!', {
        duration: 5000,
        description: 'I will get back to you as soon as possible.',
      });
    }
  }, [formSuccess]);

  const handleSubmit = async (values: FormData) => {
    setFormError(null);
    setFormSuccess(false);
    setFieldErrors({});

    // Client-side validation
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      const fieldErrors = z.flattenError(parsed.error).fieldErrors;
      Object.keys(fieldErrors).forEach((key) => {
        const errArr = fieldErrors[key as keyof typeof fieldErrors];
        if (errArr && errArr.length > 0) errors[key] = errArr[0] ?? '';
      });
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json();
        if (data?.error?.fieldErrors) {
          const errors: Record<string, string> = {};
          const fieldErrors = data.error.fieldErrors;
          Object.keys(fieldErrors).forEach((key) => {
            const errArr = fieldErrors[key as keyof typeof fieldErrors];
            if (errArr && errArr.length > 0) errors[key] = errArr[0] ?? '';
          });
          setFieldErrors(errors);
        } else {
          setFormError(data?.error || 'Failed to send message.');
        }
        setIsSubmitting(false);
        return;
      }
      setFormSuccess(true);
      form.reset();
    } catch (err) {
      setFormError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id='contact'
      className='mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-12 space-y-4 text-center'
      >
        <h2 className='text-3xl font-bold md:text-4xl'>{sectionTitle}</h2>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          {sectionDescription}
        </p>
      </motion.div>

      <div className='mx-auto max-w-4xl'>
        <div className='grid grid-cols-1 gap-8'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='lg:col-span-2'
          >
            <Card className='border-muted hover:border-primary/20 border-2 shadow-lg transition-colors duration-300'>
              <CardContent className='space-y-6'>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className='space-y-6'
                  >
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex items-center gap-2'>
                              <User className='text-primary h-4 w-4' />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your full name'
                                className='focus:border-primary h-12 border-2 transition-colors'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex items-center gap-2'>
                              <Mail className='text-primary h-4 w-4' />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='Enter your email address'
                                className='focus:border-primary h-12 border-2 transition-colors'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='reason'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <MessageCircleQuestion className='text-primary h-4 w-4' />
                            What can I help you with?
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className='focus:border-primary h-12 w-auto border-2 transition-colors'>
                                <SelectValue placeholder='Select a reason for contact' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {reasons.map((reason) => (
                                <SelectItem
                                  key={reason.value}
                                  value={reason.value}
                                >
                                  {reason.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-2'>
                            <MessageSquare className='text-primary h-4 w-4' />
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell me about your project, timeline, budget, or any specific requirements...'
                              rows={6}
                              className='focus:border-primary resize-none border-2 transition-colors'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type='submit'
                        className='from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 w-full bg-gradient-to-r text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className='mr-2 h-4 w-4' />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>

                <div className='border-muted border-t pt-4 text-center'></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-12 text-center'
        ></motion.div>
      </div>
    </section>
  );
}
