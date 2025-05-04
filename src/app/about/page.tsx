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
import {
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  ExternalLink,
} from "lucide-react";

// Define the experience type
interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

// Define the education type
interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
}

// Sample experience data
const experiences: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    period: "2021 - Present",
    description: [
      "Lead a team of 5 developers in building and maintaining the company's flagship SaaS product",
      "Implemented a new component library that reduced development time by 40%",
      "Optimized application performance, resulting in a 30% improvement in load times",
      "Mentored junior developers and conducted code reviews to ensure code quality",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    title: "Frontend Developer",
    company: "InnovateLabs",
    location: "Seattle, WA",
    period: "2018 - 2021",
    description: [
      "Developed responsive web applications for various clients in the e-commerce sector",
      "Collaborated with designers and backend developers to implement new features",
      "Refactored legacy code to modern standards, improving maintainability",
      "Participated in agile development processes, including daily stand-ups and sprint planning",
    ],
    skills: ["React", "JavaScript", "CSS", "Redux", "REST APIs"],
  },
  {
    title: "Web Developer",
    company: "DesignStudio",
    location: "Portland, OR",
    period: "2016 - 2018",
    description: [
      "Created custom websites for small to medium-sized businesses",
      "Designed and implemented responsive layouts and interactive elements",
      "Managed client relationships and gathered requirements",
      "Maintained and updated existing websites to improve performance and security",
    ],
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
  },
];

// Sample education data
const education: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2014 - 2016",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Washington",
    location: "Seattle, WA",
    period: "2010 - 2014",
    description: "Minor in Design. Graduated with honors.",
  },
];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Hello, I'm John Doe</CardTitle>
              <CardDescription>
                Frontend Developer & UI/UX Enthusiast
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                I'm a passionate frontend developer with over 7 years of
                experience creating beautiful, functional, and user-centered
                digital experiences. Based in San Francisco, I specialize in
                building modern web applications using React, Next.js, and
                TypeScript.
              </p>
              <p>
                My journey in web development began during my college years when
                I built my first website for a local non-profit organization.
                Since then, I've had the opportunity to work with startups,
                agencies, and enterprise companies, helping them bring their
                digital products to life.
              </p>
              <p>
                What drives me is the perfect blend of technical problem-solving
                and creative design. I believe that great digital products
                should not only function flawlessly but also provide an
                intuitive and enjoyable user experience. This philosophy guides
                my approach to every project I undertake.
              </p>
              <p>
                When I'm not coding, you can find me hiking in the mountains,
                experimenting with new cooking recipes, or contributing to
                open-source projects. I'm also passionate about teaching and
                regularly create tutorials and workshops to help new developers
                enter the field.
              </p>
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">My Core Values</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Continuous Learning:</strong> Technology evolves
                    rapidly, and I'm committed to staying at the forefront by
                    constantly learning and experimenting with new tools and
                    techniques.
                  </li>
                  <li>
                    <strong>User-Centered Design:</strong> I believe that
                    understanding user needs is essential to creating successful
                    digital products.
                  </li>
                  <li>
                    <strong>Code Quality:</strong> I'm passionate about writing
                    clean, maintainable, and well-documented code that stands
                    the test of time.
                  </li>
                  <li>
                    <strong>Collaboration:</strong> The best results come from
                    diverse perspectives and effective teamwork.
                  </li>
                  <li>
                    <strong>Knowledge Sharing:</strong> I'm dedicated to giving
                    back to the community through mentorship, open-source
                    contributions, and educational content.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="John Doe"
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
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="text-xs">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="text-xs">LinkedIn</span>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="text-xs">Twitter</span>
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                  <span className="text-xs">YouTube</span>
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="text-xs">Instagram</span>
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="text-xs">Facebook</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Next.js</Badge>
                <Badge>TypeScript</Badge>
                <Badge>JavaScript</Badge>
                <Badge>HTML5</Badge>
                <Badge>CSS3</Badge>
                <Badge>Tailwind CSS</Badge>
                <Badge>Redux</Badge>
                <Badge>GraphQL</Badge>
                <Badge>REST APIs</Badge>
                <Badge>Node.js</Badge>
                <Badge>Git</Badge>
                <Badge>UI/UX Design</Badge>
                <Badge>Responsive Design</Badge>
                <Badge>Performance Optimization</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
          <div className="relative border-l border-muted pl-6 ml-3">
            {experiences.map((experience, index) => (
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
            {education.map((edu, index) => (
              <div key={index} className="mb-10 relative">
                {/* Timeline dot */}
                <div className="absolute w-4 h-4 bg-secondary rounded-full -left-[30px] top-1.5 border-4 border-background"></div>

                {/* Content */}
                <div className="bg-card border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground">
                        {edu.institution} • {edu.location}
                      </p>
                    </div>
                    <div className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">
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

        <div>
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AWS Certified Developer</CardTitle>
                <CardDescription>Amazon Web Services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Issued: January 2022
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Verify
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Professional Frontend Developer</CardTitle>
                <CardDescription>Meta (formerly Facebook)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Issued: March 2021
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Verify
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Button asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
