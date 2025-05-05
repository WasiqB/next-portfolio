"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubscribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubscribeEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form
    setFormData({ name: "", email: "", reason: "", message: "" });
    // Show success message
    alert("Message sent successfully!");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription here
    console.log("Subscribing email:", subscribeEmail);
    // Reset form
    setSubscribeEmail("");
    // Show success message
    alert("Subscribed successfully!");
  };

  return (
    <section
      id="contact"
      className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Contact Me</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Feel free to reach out to me for any inquiries or collaboration
          opportunities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium">
                    Reason for Contact
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason || ""}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="" disabled>
                      Select a reason
                    </option>
                    <option value="project">Project Inquiry</option>
                    <option value="job">Job Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="question">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Subscribe to My Newsletter</CardTitle>
              <CardDescription>
                Get updates on my latest projects, articles, and tutorials.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground">
                  Stay up to date with my latest work and insights. I send out
                  newsletters with:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                  <li>New project announcements</li>
                  <li>Blog posts and tutorials</li>
                  <li>Tips and best practices</li>
                  <li>Exclusive content for subscribers</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  I respect your privacy and will never share your email. You
                  can unsubscribe at any time.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="subscribe-email"
                    className="text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <Input
                    id="subscribe-email"
                    type="email"
                    value={subscribeEmail}
                    onChange={handleSubscribeChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
