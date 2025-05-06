import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Portfolio Theme Pricing</h1>
      </div>

      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-lg text-muted-foreground">
          Get the exact same theme used on this portfolio website for your own
          projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <Card className="flex flex-col border-border">
          <CardHeader>
            <CardTitle className="text-xl">Basic</CardTitle>
            <CardDescription>For personal projects</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {[
                "Complete portfolio template",
                "Responsive design",
                "Dark/light mode",
                "Basic components",
                "6 months of updates",
                "Community support",
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/theme/checkout?plan=basic">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col relative border-primary before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-primary/5">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Popular
            </span>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Professional</CardTitle>
            <CardDescription>For freelancers & agencies</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {[
                "Everything in Basic",
                "Advanced components",
                "Multiple page templates",
                "Custom sections",
                "1 year of updates",
                "Priority support",
                "Use on up to 5 projects",
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/theme/checkout?plan=professional">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col border-border">
          <CardHeader>
            <CardTitle className="text-xl">Enterprise</CardTitle>
            <CardDescription>For larger organizations</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$249</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {[
                "Everything in Professional",
                "Unlimited projects",
                "Custom branding",
                "Advanced integrations",
                "Lifetime updates",
                "Dedicated support",
                "1-hour consultation call",
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/theme/checkout?plan=enterprise">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 bg-muted/50 rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              What's included in the theme package?
            </h3>
            <p className="text-muted-foreground">
              The theme package includes all the source code you see on this
              website, including components, layouts, and pages. You'll receive
              a complete Next.js project that you can customize for your own
              needs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              Can I use this theme for client projects?
            </h3>
            <p className="text-muted-foreground">
              Yes, with the Professional and Enterprise plans, you can use this
              theme for client projects. The Basic plan is limited to personal
              use only.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 14-day money-back guarantee if you're not satisfied
              with the theme. Simply contact us with your purchase details for a
              full refund.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How do I get support?</h3>
            <p className="text-muted-foreground">
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
