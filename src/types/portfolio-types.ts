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

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  likes: number;
  comments: number;
  publishDate: string;
  category: 'video' | 'short';
  platform: string;
}

export interface VideosData {
  sectionTitle: string;
  sectionDescription: string;
  youtubeChannelId: string;
  channelUrl: string;
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

export interface PortfolioData {
  url: string;
  hero: HeroData;
  projects: ProjectsData;
  videos: VideosData;
  about: AboutData;
  github: {
    username: string;
  };
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

export interface MediumBlog {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  pubDate: string;
  categories: string[];
  link: string;
  guid: string;
  author: string;
  enclosure?: any;
}
