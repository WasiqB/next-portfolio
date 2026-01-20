import type { PortfolioData } from '@/types/portfolio-types';

export const Data: PortfolioData = {
  url: 'https://wasiqbhamla.com',
  hero: {
    name: 'Wasiq Amjad Bhamla',
    typingSequences: [
      'Quality Assurance Specialist',
      2000,
      'Open Source Contributor',
      2000,
      'YouTuber',
      2000,
      'Blogger',
      2000,
    ],
    typingDelay: 2000,
    bio: "I'm a passionate and experienced Quality Assurance Engineer with expertise in manual and automated testing of Web, Desktop, API, Android and iOS applications.",
    buttons: {
      primary: {
        text: 'My Projects',
        href: '#projects',
      },
      secondary: {
        text: 'My Services',
        href: '#services',
      },
    },
    socialLinks: [
      {
        platform: 'github',
        url: 'https://github.com/WasiqB',
        ariaLabel: 'GitHub',
      },
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/wasiqbhamla',
        ariaLabel: 'LinkedIn',
      },
      {
        platform: 'x',
        url: 'https://x.com/WasiqBhamla',
        ariaLabel: 'X',
      },
      {
        platform: 'youtube',
        url: 'https://www.youtube.com/@WasiqBhamla',
        ariaLabel: 'YouTube',
      },
      {
        platform: 'instagram',
        url: 'https://www.instagram.com/WasiqBhamla',
        ariaLabel: 'Instagram',
      },
      {
        platform: 'facebook',
        url: 'https://www.facebook.com/wasiqb',
        ariaLabel: 'Facebook',
      },
    ],
    profileImage: {
      src: '/images/wasiq-1.jpg',
      alt: 'Profile',
    },
  },
  analytics: {
    gaId: 'G-1R5917Q9SG',
  },
};
