export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface HeroData {
  name: string;
  typingSequences: (string | number)[];
  typingDelay: number;
  bio: string;
  buttons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  socialLinks: SocialLink[];
  profileImage: {
    src: string;
    alt: string;
  };
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  stars: number;
  forks: number;
}

export interface ProjectsData {
  sectionTitle: string;
  sectionDescription: string;
  projects: string[];
  allProjectsButton: {
    text: string;
    href: string;
  };
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Deliverable {
  step: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  duration: string;
  cost: string;
}

export interface ServicesData {
  sectionTitle: string;
  sectionDescription: string;
  services: Service[];
  viewAllButton: {
    text: string;
    href: string;
  };
  deliverables: Deliverable[];
  bookCallButton: {
    text: string;
    href: string;
  };
}

export interface BlogData {
  sectionTitle: string;
  sectionDescription: string;
  sources: {
    source: "Medium" | "custom";
    username?: string;
    urls?: string[];
  }[];
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  likes: number;
  comments: number;
  publishDate: string;
  category: "video" | "short";
  platform: string;
}

export interface VideosData {
  sectionTitle: string;
  sectionDescription: string;
  youtubeChannelId: string;
  channelUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
  category?: "client" | "colleague" | "student" | "general";
  featured?: boolean;
}

export interface TestimonialsData {
  sectionTitle: string;
  sectionDescription: string;
  testimonials: Testimonial[];
  viewAllButton?: {
    text: string;
    href: string;
  };
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  issued: string;
  verifyUrl?: string;
}

export interface Analytics {
  gaId: string;
}

export interface AboutData {
  name: string;
  title: string;
  email: string;
  description: string[];
  coreValues: { label: string; value: string }[];
  experiences: Experience[];
  education: Education[];
  certifications?: Certificate[];
  skills: string[];
  socialLinks: SocialLink[];
  profileImage: {
    src: string;
    alt: string;
  };
}

type TierType =
  | "starter"
  | "backer"
  | "bronze"
  | "silver"
  | "gold"
  | "diamond"
  | "platinum"
  | "donation"
  | "one_time";

export interface SponsorTier {
  name: string;
  slug: TierType;
  description: string;
  price?: number;
  benefits: string[];
  githubTierUrl: string;
}

export interface Sponsor {
  id: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  tier: TierType;
  message?: string;
}

export interface SponsorsData {
  sectionTitle: string;
  sectionDescription: string;
  tiers: SponsorTier[];
  sponsors: Sponsor[];
  viewAllButton?: {
    text: string;
    href: string;
  };
}

export interface PortfolioData {
  url: string;
  hero: HeroData;
  projects: ProjectsData;
  services: ServicesData;
  blogs: BlogData;
  videos: VideosData;
  testimonials: TestimonialsData;
  about: AboutData;
  github: {
    username: string;
  };
  sponsors: SponsorsData;
  analytics: Analytics;
}

export interface Blog {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  tags: string[];
  source: string;
  url: string;
}
