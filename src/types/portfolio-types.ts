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

export interface PortfolioData {
  hero: HeroData;
  projects: ProjectsData;
}
