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
