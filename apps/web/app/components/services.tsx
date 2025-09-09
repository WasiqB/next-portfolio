'use client';

import { Data as portfolioData } from '@/app/data/portfolio-data';
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
  Code2,
  Headphones,
  LifeBuoy,
  LucideIcon,
  Pen,
  Settings2,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, LucideIcon> = {
  Settings2,
  ShieldCheck,
  Pen,
  Headphones,
  LifeBuoy,
  Code2,
};

export default function Services() {
  const { sectionTitle, sectionDescription, viewAllButton } =
    portfolioData.services;
  const services = useVariableValue('services', {
    status: 'off',
  }).services?.valueOf() as Service[] | undefined;

  const handleServiceClick = (serviceId: string) => {
    window.location.href = `/services?service=${serviceId}`;
  };

  return (
    <section
      id='services'
      className='bg-muted/50 mx-auto max-w-[90rem] px-6 py-12 sm:px-8 md:px-12 md:py-24 lg:px-16'
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

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {services?.slice(0, 6).map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className='group hover:border-primary/50 h-full cursor-pointer border-2 transition-all duration-300 hover:shadow-lg'
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader>
                  <div className='text-primary mb-4 transition-transform duration-300 group-hover:scale-110'>
                    {Icon && <Icon className='h-10 w-10' />}
                  </div>
                  <CardTitle className='group-hover:text-primary transition-colors duration-300'>
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='text-primary text-sm font-medium group-hover:underline'>
                    View Process →
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className='mt-8 flex justify-center'>
        <Button asChild>
          <Link href={viewAllButton.href}>{viewAllButton.text}</Link>
        </Button>
      </div>
    </section>
  );
}
