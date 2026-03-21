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

export interface AboutPage {
  name: string;
  title: string;
  description: string[];
  image: string;
  coreValues: {
    label: string;
    value: string;
  }[];
  skills: string[];
  seo?: {
    keywords: string[];
  };
}

export interface Analytics {
  gaId: string;
}

export interface ContactPage {
  title: string;
  description: string;
  email: string;
  reasons: {
    name: string;
    value: string;
  }[];
}

export interface Footer {
  logo: {
    lightLogo: string;
    darkLogo: string;
  };
  socialSection: {
    title: string;
  };
  categories: {
    title: string;
    items: {
      label: string;
      url: string;
      visible: boolean;
    }[];
  }[];
  copyrightText: string;
}

export interface HomePage {
  heroSection: {
    name: string;
    typingTexts: string[];
    typingDelay: number;
    bio: string;
    primaryButton: {
      label: string;
      url: string;
    };
    secondaryButton: {
      label: string;
      url: string;
    };
    image: string;
  };
  projectSection: {
    title: string;
    description: string;
    projectUrls: string[];
    allProjectsButton: {
      label: string;
      url: string;
    };
  };
  serviceSection: {
    title: string;
    description: string;
    allServicesButton: {
      label: string;
      url: string;
    };
    bookACallButton: {
      label: string;
      url: string;
    };
  };
  blogSection: {
    title: string;
    description: string;
    allBlogsButton: {
      label: string;
      url: string;
    };
  };
  videoSection: {
    title: string;
    description: string;
    channelUrl: string;
    channelId: string;
    allVideosButton: {
      label: string;
      url: string;
    };
  };
  testimonialSection: {
    title: string;
    description: string;
    viewAllButton: {
      label: string;
      url: string;
    };
  };
  sponsorSection: {
    title: string;
    description: string;
    viewAllButton: {
      label: string;
      url: string;
    };
  };
  seo?: {
    keywords: string[];
  };
}

export interface Header {
  logo: {
    lightLogo: string;
    darkLogo: string;
  };
  navigation: {
    label: string;
    url?: string;
    icon: string;
    hasSubMenu?: boolean;
    subMenu?: {
      label: string;
      url: string;
      icon: string;
      description: string;
      visible: boolean;
    }[];
    visible: boolean;
  }[];
  themeToggle: {
    visible: boolean;
  };
  ctaButton: {
    label: string;
    url: string;
    icon?: string;
    target: '_blank' | '_self';
    visible: boolean;
  };
}

export interface SiteSettings {
  defaultLanguage: string;
  name: string;
  titleTemplate: string;
}

export interface Page {
  title: string;
  description: string;
  seo?: {
    keywords: string[];
  };
}

export interface BlogSource {
  source: 'medium' | 'custom';
  url?: string;
  username?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  issueDate: string;
  verifyUrl: string;
}

export interface Education {
  title: string;
  university: string;
  period: string;
  description: string;
  location: string;
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  jobType: 'on-site' | 'remote' | 'hybrid';
  jobMode: 'full-time' | 'contract' | 'freelancing';
  responsibilities: string[];
  skills: string[];
  industry: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: {
    step: number;
    title: string;
    description: string;
    icon: string;
    details: string[];
    duration: string;
    cost: string;
  }[];
}

export interface Social {
  platform: 'facebook' | 'x' | 'linkedin' | 'instagram' | 'github' | 'youtube' | 'email';
  url: string;
  label: string;
}

export interface SponsorTier {
  name: string;
  id: string;
  description: string;
  price: number;
  benefits: string[];
  tierUrl: string;
}

export interface Sponsor {
  name: string;
  avatar: string;
  url: string;
  tier: string;
}

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  avatar: string;
  testimonial: string;
  category: 'client' | 'general' | 'colleague';
  featured: boolean;
}
