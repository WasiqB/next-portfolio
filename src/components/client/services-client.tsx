'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import DynamicLucideIcon, { type IconName } from '@/components/dynamic-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { HomePage, Service } from '@/types/portfolio-types';

interface ServicesClientProps {
  serviceSection: HomePage['serviceSection'];
  services: Service[];
}

export default function ServicesClient({ serviceSection, services }: ServicesClientProps) {
  const handleServiceClick = (serviceId: string) => {
    window.location.href = `/services?service=${serviceId}`;
  };

  return (
    <section id='services' className='max-w-360 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24 bg-muted/50'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-4 text-center mb-12'
      >
        <h2 className='text-3xl md:text-4xl font-bold'>{serviceSection.title}</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>{serviceSection.description}</p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services?.slice(0, 6).map((service, index) => {
          const Icon: IconName = service.icon.toLowerCase() as IconName;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full group transition-all duration-300 border-2 ${
                  service.isTemporarilyStopped
                    ? 'cursor-not-allowed bg-muted/30 border-border/50 hover:shadow-none'
                    : 'cursor-pointer hover:shadow-lg hover:border-primary/50'
                }`}
                onClick={() => !service.isTemporarilyStopped && handleServiceClick(service.id)}
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
                    {Icon && <DynamicLucideIcon name={Icon} className='h-10 w-10' />}
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
                </CardHeader>
                <CardContent>
                  {!service.isTemporarilyStopped && (
                    <div className='text-sm text-primary font-medium group-hover:underline'>View Process →</div>
                  )}
                  {service.isTemporarilyStopped && (
                    <div className='text-sm text-muted-foreground font-medium'>Coming Soon</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {serviceSection.allServicesButton && (
        <div className='flex justify-center mt-8'>
          <Button asChild>
            <Link href={serviceSection.allServicesButton.url}>{serviceSection.allServicesButton.label}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
