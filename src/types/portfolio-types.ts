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

export interface Analytics {
  gaId: string;
}

export interface PortfolioData {
  url: string;
  hero: HeroData;
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
