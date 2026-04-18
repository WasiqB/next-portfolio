'use client';

import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { HomePage, Service } from '@/types/portfolio-types';
import DynamicLucideIcon, { type IconName } from '../dynamic-icon';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ServicesPageProps {
  sectionTitle: string;
  sectionDescription: string;
  bookCallButton: HomePage['serviceSection']['bookACallButton'];
  services: Service[];
}

export default function ServiceContent({
  sectionTitle,
  sectionDescription,
  bookCallButton,
  services,
}: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceSlug = searchParams.get('service');
    if (serviceSlug) {
      const service = services?.find((s) => s.id === serviceSlug);
      if (service) {
        setSelectedService(service);

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
  }, [searchParams, services]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);

    const url = new URL(window.location.href);
    url.searchParams.set('service', service.id);
    window.history.pushState({}, '', url.toString());

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
    <div className='container py-12 max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex items-center gap-4 mb-8'
      >
        <Button variant='outline' size='sm' asChild>
          <Link href='/#services'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>{sectionTitle}</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='max-w-3xl mx-auto mb-12'
      >
        <p className='text-lg text-muted-foreground'>{sectionDescription}</p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {services?.map((service, index) => {
          const Icon: IconName = service.icon.toLowerCase() as IconName;
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
                className={`h-full flex flex-col group transition-all duration-300 border-2 bg-linear-to-br from-background to-muted/20 ${
                  service.isTemporarilyStopped
                    ? 'cursor-not-allowed hover:shadow-none bg-muted/10 border-border/50'
                    : 'cursor-pointer hover:shadow-lg hover:border-primary/20'
                } ${
                  selectedService?.id === service.id
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'hover:border-primary/20'
                }`}
                onClick={() => !service.isTemporarilyStopped && handleServiceClick(service)}
              >
                <CardHeader className='relative overflow-hidden'>
                  {service.isTemporarilyStopped && (
                    <div className='absolute top-3 right-3 z-10'>
                      <Badge className='bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-semibold'>
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                  <div
                    className={`mb-4 transition-transform duration-300 ${
                      service.isTemporarilyStopped ? 'text-muted-foreground/80' : 'text-primary group-hover:scale-110'
                    }`}
                  >
                    <DynamicLucideIcon name={Icon} className='h-6 w-6' />
                  </div>
                  <CardTitle
                    className={`transition-colors duration-300 ${
                      service.isTemporarilyStopped ? 'text-foreground/70' : 'group-hover:text-primary'
                    }`}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription className={service.isTemporarilyStopped ? 'text-muted-foreground' : ''}>
                    {service.description}
                  </CardDescription>
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10 ${
                      !service.isTemporarilyStopped ? 'group-hover:scale-150' : ''
                    } transition-transform duration-500`}
                  ></div>
                  {selectedService?.id === service.id && !service.isTemporarilyStopped && (
                    <div className='absolute top-2 right-2'>
                      <CheckCircle className='h-6 w-6 text-primary' />
                    </div>
                  )}
                </CardHeader>
                <CardContent className='grow'>
                  {!service.isTemporarilyStopped ? (
                    <ul className='space-y-2'>
                      {service.features?.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className='flex items-start gap-2 text-sm'
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 group-hover:bg-primary/80 transition-colors duration-300'></div>
                          <span className='text-muted-foreground group-hover:text-foreground transition-colors duration-300'>
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className='text-sm text-muted-foreground font-medium'>Coming Soon</div>
                  )}
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
          className='w-full mb-12'
          id='service-timeline'
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>{selectedService.title} Process</h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Here's my proven process for delivering exceptional {selectedService.title.toLowerCase()} results.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <div className='relative'>
              {/* Timeline line */}
              <div className='absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-linear-to-b from-primary via-primary/50 to-primary hidden md:block'></div>

              {/* Timeline steps */}
              <div className='space-y-12'>
                {selectedService.deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline dot */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 hidden md:block'></div>

                    {/* Content card */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className='group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-linear-to-br from-background to-muted/10'>
                        <CardHeader className='relative overflow-hidden'>
                          <div className='flex items-center gap-4 mb-2'>
                            <div className='text-2xl'>{item.icon}</div>
                            <div className='text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded'>
                              STEP {item.step}
                            </div>
                          </div>
                          <CardTitle className='text-xl group-hover:text-primary transition-colors'>
                            {item.title}
                          </CardTitle>
                          <CardDescription className='text-base'>{item.description}</CardDescription>
                          <div className='absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500'></div>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 mb-4'>
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className='flex items-start gap-2 text-sm text-left'>
                                <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0'></div>
                                <span className='text-muted-foreground'>{detail}</span>
                              </li>
                            ))}
                          </ul>
                          <div className='flex justify-between items-center pt-3 border-t border-muted'>
                            <div className='text-sm'>
                              <span className='text-muted-foreground'>Duration: </span>
                              <span className='font-medium'>{item.duration}</span>
                            </div>
                            <div className='text-sm'>
                              <span className='text-muted-foreground'>Cost: </span>
                              <span className='font-medium text-primary'>{item.cost}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Mobile step indicator */}
                    <div className='md:hidden absolute -left-4 top-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold'>
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
      {bookCallButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='text-center mt-12 p-8 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20'
        >
          <h3 className='text-2xl font-bold mb-4'>Ready to Get Started?</h3>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            {selectedService
              ? `Let's discuss your ${selectedService.title.toLowerCase()} project and see how I can help bring your vision to life.`
              : "Let's discuss your project and see how I can help bring your vision to life."}{' '}
            Book your free discovery call today - no strings attached!
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild className='group'>
              <Link href={bookCallButton.url} target='_blank'>
                <span>{bookCallButton.label}</span>
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
          <p className='text-xs text-muted-foreground mt-4'>
            ⚡ Most clients see results within the first week of starting
          </p>
        </motion.div>
      )}
    </div>
  );
}
