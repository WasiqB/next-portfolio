import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";

// Define the sponsor type
interface Sponsor {
  id: string;
  name: string;
  image: string;
  url: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

// Sample sponsors data
const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Acme Inc",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "platinum",
  },
  {
    id: "2",
    name: "TechCorp",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "gold",
  },
  {
    id: "3",
    name: "DevStudio",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "silver",
  },
  {
    id: "4",
    name: "CodeLabs",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "silver",
  },
  {
    id: "5",
    name: "WebWorks",
    image: "/placeholder.svg?height=200&width=200",
    url: "https://example.com",
    tier: "bronze",
  },
];

// Sponsor card component
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="relative aspect-square overflow-hidden rounded-full border-2 border-muted transition-all hover:border-primary">
        <Image
          src={sponsor.image || "/placeholder.svg"}
          alt={sponsor.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-3 text-center">
        <h3 className="font-medium">{sponsor.name}</h3>
        <p className="text-xs text-muted-foreground capitalize">
          {sponsor.tier} Sponsor
        </p>
      </div>
    </Link>
  );
}

export default function SponsorsPage() {
  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">My Sponsors</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Why Sponsor Me?</CardTitle>
              <CardDescription>
                Support my open source work and help me create more content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By becoming a sponsor, you're not just supporting my work,
                you're investing in the future of open source software and
                educational content that benefits the entire developer
                community.
              </p>
              <p>Your sponsorship helps me dedicate more time to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creating high-quality tutorials and educational content</li>
                <li>Maintaining and improving open source projects</li>
                <li>Developing new tools and libraries for the community</li>
                <li>
                  Mentoring new developers and contributing to the ecosystem
                </li>
              </ul>
              <p>
                In return, sponsors receive benefits like priority support,
                early access to content, personalized consulting, and
                recognition on my website and GitHub repositories.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500 fill-red-500" />
                GitHub Sponsors
              </CardTitle>
              <CardDescription>
                Support me through GitHub Sponsors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GitHub Sponsors allows you to support my work with monthly
                recurring payments or one-time contributions.
              </p>
              <Button className="w-full" asChild>
                <Link
                  href="https://github.com/sponsors/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Sponsor on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Current Sponsors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {/* Current Sponsors Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Current Sponsors</h2>

          {/* Platinum Tier */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
              <span className="bg-gradient-to-r from-slate-300 to-slate-400 w-6 h-6 rounded-full mr-2"></span>
              Platinum Sponsors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {sponsors
                .filter((s) => s.tier === "platinum")
                .map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
            </div>
          </div>

          {/* Gold Tier */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 w-6 h-6 rounded-full mr-2"></span>
              Gold Sponsors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {sponsors
                .filter((s) => s.tier === "gold")
                .map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
            </div>
          </div>

          {/* Silver Tier */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
              <span className="bg-gradient-to-r from-gray-300 to-gray-400 w-6 h-6 rounded-full mr-2"></span>
              Silver Sponsors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {sponsors
                .filter((s) => s.tier === "silver")
                .map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 inline-flex items-center">
              <span className="bg-gradient-to-r from-amber-600 to-amber-700 w-6 h-6 rounded-full mr-2"></span>
              Bronze Sponsors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {sponsors
                .filter((s) => s.tier === "bronze")
                .map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
            </div>
          </div>
        </div>

        {/* Past Sponsors Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Past Sponsors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Example past sponsors - you would need to add actual past sponsors data */}
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="relative w-16 h-16 mx-auto overflow-hidden rounded-full border border-muted">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Past Sponsor"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <p className="mt-2 text-xs">Past Co.</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="relative w-16 h-16 mx-auto overflow-hidden rounded-full border border-muted">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Past Sponsor"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <p className="mt-2 text-xs">Former Inc.</p>
            </div>
          </div>
        </div>

        {/* Why Sponsor Section */}
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Why Sponsor My Work?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Benefits for Sponsors</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    <strong>Priority Support</strong> - Get direct access and
                    priority responses to your questions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    <strong>Logo Placement</strong> - Your logo displayed on my
                    website and GitHub repositories
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    <strong>Early Access</strong> - Preview new content, tools,
                    and projects before public release
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    <strong>Consulting Time</strong> - Monthly consulting
                    sessions (tier-dependent)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    <strong>Custom Development</strong> - Influence on project
                    roadmaps and feature prioritization
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Your Impact</h3>
              <p>Your sponsorship directly enables:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    Continued maintenance of open source projects used by
                    thousands of developers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    Creation of high-quality educational content, tutorials, and
                    documentation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    Development of new tools and libraries that benefit the
                    entire community
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    More time dedicated to answering questions and helping the
                    community
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded mr-2 text-primary">
                    ✓
                  </span>
                  <span>
                    Sustainable development of free resources that help
                    developers worldwide
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Sponsorship Tiers</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="inline-flex items-center">
                  <span className="bg-gradient-to-r from-amber-600 to-amber-700 w-4 h-4 rounded-full mr-2"></span>
                  Bronze
                </h4>
                <p className="text-2xl font-bold my-2">$5 /month</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Name in sponsors list</li>
                  <li>Early access to content</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="inline-flex items-center">
                  <span className="bg-gradient-to-r from-gray-300 to-gray-400 w-4 h-4 rounded-full mr-2"></span>
                  Silver
                </h4>
                <p className="text-2xl font-bold my-2">$25 /month</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Small logo in sponsors list</li>
                  <li>Priority support</li>
                  <li>All Bronze benefits</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="inline-flex items-center">
                  <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 w-4 h-4 rounded-full mr-2"></span>
                  Gold
                </h4>
                <p className="text-2xl font-bold my-2">$100 /month</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Medium logo with link</li>
                  <li>1 hour consulting monthly</li>
                  <li>All Silver benefits</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="inline-flex items-center">
                  <span className="bg-gradient-to-r from-slate-300 to-slate-400 w-4 h-4 rounded-full mr-2"></span>
                  Platinum
                </h4>
                <p className="text-2xl font-bold my-2">$500 /month</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Large logo with prime placement</li>
                  <li>4 hours consulting monthly</li>
                  <li>Custom development priority</li>
                  <li>All Gold benefits</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button asChild>
              <Link
                href="https://github.com/sponsors/johndoe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Heart className="h-4 w-4 mr-2" />
                Sponsor on GitHub
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="mailto:sponsor@example.com">
                Contact for Custom Sponsorship
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
