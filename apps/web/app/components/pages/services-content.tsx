'use client';

import { Service } from '@/app/types/portfolio-types';
import { useVariableValue } from '@wb/feature-toggle/client';
import { Button } from '@wb/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@wb/ui/components/card';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Code2,
  Headphones,
  LifeBuoy,
  LucideIcon,
  Pen,
  Settings2,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Settings2,
  ShieldCheck,
  Pen,
  Headphones,
  LifeBuoy,
  Code2,
};

interface ServicesPageProps {
  sectionTitle: string;
  sectionDescription: string;
  bookCallButton: {
    text: string;
    href: string;
  };
}

export default function ServiceContent({
  sectionTitle,
  sectionDescription,
  bookCallButton,
}: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const searchParams = useSearchParams();
  const services = useVariableValue('services', {
    status: 'off',
  }).services?.valueOf() as Service[] | undefined;

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const service = services?.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        // Scroll to timeline section after a short delay
        setTimeout(() => {
          const timelineElement = document.getElementById('service-timeline');
          if (timelineElement) {
            timelineElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('service', service.id);
    window.history.pushState({}, '', url.toString());

    // Scroll to timeline section
    setTimeout(() => {
      const timelineElement = document.getElementById('service-timeline');
      if (timelineElement) {
        timelineElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  return (
    <div className='container mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'>
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/#services'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>{sectionTitle}</h1>
      </div>

      <div className='mx-auto mb-12 max-w-3xl'>
        <p className='text-muted-foreground text-lg'>{sectionDescription}</p>
      </div>

      <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {services?.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className={`group from-background to-muted/20 flex h-full cursor-pointer flex-col border-2 bg-gradient-to-br transition-all duration-300 hover:shadow-lg ${
                  selectedService?.id === service.id
                    ? 'border-primary ring-primary/20 shadow-lg ring-2'
                    : 'hover:border-primary/20'
                }`}
                onClick={() => handleServiceClick(service)}
              >
                <CardHeader className='relative overflow-hidden'>
                  <div className='text-primary mb-4 transition-transform duration-300 group-hover:scale-110'>
                    {Icon && <Icon className='h-6 w-6' />}
                  </div>
                  <CardTitle className='group-hover:text-primary transition-colors duration-300'>
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className='bg-primary/5 absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full transition-transform duration-500 group-hover:scale-150'></div>
                  {selectedService?.id === service.id && (
                    <div className='absolute top-2 right-2'>
                      <CheckCircle className='text-primary h-6 w-6' />
                    </div>
                  )}
                </CardHeader>
                <CardContent className='flex-grow'>
                  <ul className='space-y-2'>
                    {service.features?.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className='flex items-start gap-2 text-sm'
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className='bg-primary group-hover:bg-primary/80 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-300'></div>
                        <span className='text-muted-foreground group-hover:text-foreground transition-colors duration-300'>
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Service Timeline Section */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center'
        >
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-3xl font-bold'>
              {selectedService.title} Process
            </h2>
            <p className='text-muted-foreground mx-auto max-w-2xl'>
              Here's my proven process for delivering exceptional{' '}
              {selectedService.title.toLowerCase()} results.
            </p>
          </div>

          <div className='mx-auto max-w-4xl'>
            <div className='relative'>
              {/* Timeline line */}
              <div className='from-primary via-primary/50 to-primary absolute left-1/2 hidden h-full w-0.5 -translate-x-0.5 transform bg-gradient-to-b md:block'></div>

              {/* Timeline steps */}
              <div className='space-y-12'>
                {selectedService.deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className='bg-primary border-background absolute left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 transform rounded-full border-4 shadow-lg md:block'></div>

                    {/* Content card */}
                    <div
                      className={`w-full md:w-5/12 ${
                        index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                      }`}
                    >
                      <Card className='group hover:border-primary/30 from-background to-muted/10 border-2 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
                        <CardHeader className='relative overflow-hidden'>
                          <div className='mb-2 flex items-center gap-4'>
                            <div className='text-2xl'>{item.icon}</div>
                            <div className='text-primary bg-primary/10 rounded px-2 py-1 font-mono text-sm'>
                              STEP {item.step}
                            </div>
                          </div>
                          <CardTitle className='group-hover:text-primary text-xl transition-colors'>
                            {item.title}
                          </CardTitle>
                          <CardDescription className='text-base'>
                            {item.description}
                          </CardDescription>
                          <div className='bg-primary/5 absolute top-0 right-0 h-16 w-16 translate-x-8 -translate-y-8 rounded-full transition-transform duration-500 group-hover:scale-150'></div>
                        </CardHeader>
                        <CardContent>
                          <ul className='mb-4 space-y-2'>
                            {item.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className='flex items-start gap-2 text-sm'
                              >
                                <div className='bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full'></div>
                                <span className='text-muted-foreground'>
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className='border-muted flex items-center justify-between border-t pt-3'>
                            <div className='text-sm'>
                              <span className='text-muted-foreground'>
                                Duration:{' '}
                              </span>
                              <span className='font-medium'>
                                {item.duration}
                              </span>
                            </div>
                            <div className='text-sm'>
                              <span className='text-muted-foreground'>
                                Cost:{' '}
                              </span>
                              <span className='text-primary font-medium'>
                                {item.cost}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Mobile step indicator */}
                    <div className='bg-primary text-primary-foreground absolute top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold md:hidden'>
                      {item.step}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className='from-primary/10 via-primary/5 to-primary/10 border-primary/20 mt-12 rounded-2xl border bg-gradient-to-r p-8 text-center'
      >
        <h3 className='mb-4 text-2xl font-bold'>Ready to Get Started?</h3>
        <p className='text-muted-foreground mx-auto mb-6 max-w-2xl'>
          {selectedService
            ? `Let's discuss your ${selectedService.title.toLowerCase()} project and see how I can help bring your vision to life.`
            : "Let's discuss your project and see how I can help bring your vision to life."}{' '}
          Book your free discovery call today - no strings attached!
        </p>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Button size='lg' asChild className='group'>
            <Link href={bookCallButton.href} target='_blank'>
              <span>{bookCallButton.text}</span>
              <motion.div
                className='ml-2'
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                →
              </motion.div>
            </Link>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <Link href='/#contact'>Send Quick Message</Link>
          </Button>
        </div>
        <p className='text-muted-foreground mt-4 text-xs'>
          ⚡ Most clients see results within the first week of starting
        </p>
      </motion.div>
    </div>
  );
}
