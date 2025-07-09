"use client";

import { Data as portfolioData } from "@/data/portfolio-data";
import {
  ArrowLeft,
  Code2,
  Headphones,
  LifeBuoy,
  LucideIcon,
  Pen,
  Settings2,
  Terminal,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useVariableValue } from "@devcycle/nextjs-sdk";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Settings2,
  Terminal,
  Pen,
  Headphones,
  LifeBuoy,
  Code2,
};

export default function ServiceContent() {
  const { sectionTitle, sectionDescription, services } = portfolioData.services;
  const showContact = useVariableValue("show-contact", false);

  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{sectionTitle}</h1>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-muted-foreground">{sectionDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={index} // Added key property
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="relative overflow-hidden">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features?.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex} // Added key property
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:bg-primary/80 transition-colors duration-300"></div>
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
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

      <div className="mt-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">How We'll Work Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From initial contact to project delivery, here's my proven process
            that ensures your success
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-primary hidden md:block"></div>

            {/* Timeline steps */}
            <div className="space-y-12">
              {portfolioData.services.deliverables.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 hidden md:block"></div>

                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-background to-muted/10">
                      <CardHeader className="relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-2xl">{item.icon}</div>
                          <div className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                            STEP {item.step}
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4">
                          {item.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start gap-2 text-sm"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between items-center pt-3 border-t border-muted">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Duration:{" "}
                            </span>
                            <span className="font-medium">{item.duration}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Cost:{" "}
                            </span>
                            <span className="font-medium text-primary">
                              {item.cost}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Mobile step indicator */}
                  <div className="md:hidden absolute -left-4 top-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your project and see how I can help bring your vision
            to life. Book your free discovery call today - no strings attached!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link
                href={portfolioData.services.bookCallButton.href}
                target="_blank"
              >
                <span>{portfolioData.services.bookCallButton.text}</span>
                <motion.div
                  className="ml-2"
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
            <Button size="lg" variant="outline" asChild>
              <Link
                href={
                  showContact
                    ? "/#contact"
                    : `mailto:${portfolioData.about.email}`
                }
              >
                Send Quick Message
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            ⚡ Most clients see results within the first week of starting
          </p>
        </motion.div>
      </div>
    </div>
  );
}
