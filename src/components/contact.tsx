'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Data as portfolioData } from '@/data/portfolio-data';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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
  const [_fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
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
    } catch (_err) {
      setFormError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">{sectionTitle}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {sectionDescription}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-2 border-muted hover:border-primary/20 transition-colors duration-300 shadow-lg">
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="h-12 border-2 focus:border-primary transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-primary" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="h-12 border-2 focus:border-primary transition-colors"
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
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MessageCircleQuestion className="h-4 w-4 text-primary" />
                            What can I help you with?
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 w-auto border-2 focus:border-primary transition-colors">
                                <SelectValue placeholder="Select a reason for contact" />
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
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project, timeline, budget, or any specific requirements..."
                              rows={6}
                              className="border-2 focus:border-primary transition-colors resize-none"
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
                        type="submit"
                        className="w-full h-12 text-base font-semibold bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>

                <div className="text-center pt-4 border-t border-muted"></div>
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
          className="mt-12 text-center"
        ></motion.div>
      </div>
    </section>
  );
}
