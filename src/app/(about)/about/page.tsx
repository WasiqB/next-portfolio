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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Data } from "@/data/portfolio-data";
import type { AboutData } from "@/types/portfolio-types";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const about: AboutData = Data.about;

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">About Me</h1>
      </div>

      {/* Mobile profile image - visible only on mobile */}
      <div className="md:hidden mb-8">
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={about.profileImage.src}
                alt={about.profileImage.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Hello, I'm {about.name}</CardTitle>
              <CardDescription>{about.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {about.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">My Core Values</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {about.coreValues.map((cv, i) => (
                    <li key={i}>
                      <strong>{cv.label}:</strong> {cv.value}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 hidden md:block">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={about.profileImage.src}
                  alt={about.profileImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {about.socialLinks.map((link) => {
                  let Icon = null;
                  switch (link.platform) {
                    case "github":
                      Icon = FaGithub;
                      break;
                    case "linkedin":
                      Icon = FaLinkedin;
                      break;
                    case "twitter":
                    case "x":
                      Icon = FaXTwitter;
                      break;
                    case "youtube":
                      Icon = FaYoutube;
                      break;
                    case "instagram":
                      Icon = FaInstagram;
                      break;
                    case "facebook":
                      Icon = FaFacebook;
                      break;
                    default:
                      Icon = ExternalLink;
                  }
                  return (
                    <Link
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs">
                        {link.platform.charAt(0).toUpperCase() +
                          link.platform.slice(1)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile social links and skills - visible only on mobile */}
        <div className="md:hidden space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {about.socialLinks.map((link) => {
                  let Icon = null;
                  switch (link.platform) {
                    case "github":
                      Icon = FaGithub;
                      break;
                    case "linkedin":
                      Icon = FaLinkedin;
                      break;
                    case "twitter":
                    case "x":
                      Icon = FaXTwitter;
                      break;
                    case "youtube":
                      Icon = FaYoutube;
                      break;
                    case "instagram":
                      Icon = FaInstagram;
                      break;
                    case "facebook":
                      Icon = FaFacebook;
                      break;
                    default:
                      Icon = ExternalLink;
                  }
                  return (
                    <Link
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs">
                        {link.platform.charAt(0).toUpperCase() +
                          link.platform.slice(1)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
          <div className="relative border-l border-muted pl-6 ml-3">
            {about.experiences.map((experience, index) => (
              <div key={index} className="mb-10 relative">
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[30px] top-1.5 border-4 border-background"></div>

                {/* Content */}
                <div className="bg-card border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {experience.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {experience.company} • {experience.location}
                      </p>
                    </div>
                    <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {experience.period}
                    </div>
                  </div>

                  <ul className="list-disc pl-6 space-y-1 mb-4 text-muted-foreground">
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="relative border-l border-muted pl-6 ml-3">
            {about.education.map((edu, index) => (
              <div key={index} className="mb-10 relative">
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[30px] top-1.5 border-4 border-background"></div>

                {/* Content */}
                <div className="bg-card border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground">
                        {edu.institution} • {edu.location}
                      </p>
                    </div>
                    <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {edu.period}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-muted-foreground">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {about.certifications && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.certifications.map((cert, idx) => (
                <Card key={cert.title + idx}>
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Issued: {cert.issued}
                      </span>
                      {cert.verifyUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Verify
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Button asChild>
            <Link href="/#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
