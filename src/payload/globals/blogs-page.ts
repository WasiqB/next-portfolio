import { updateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';
import { CACHE_TAGS } from '@/lib/constants';

export const BlogsPage: GlobalConfig = {
  slug: 'blogsPage',
  hooks: {
    afterChange: [
      () => {
        updateTag('blogsPage');
        updateTag(CACHE_TAGS.BLOGS);
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Blogs',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'Check out my latest articles and insights on various testing related topics.',
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'keywords',
          label: 'Keywords',
          type: 'text',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
};
