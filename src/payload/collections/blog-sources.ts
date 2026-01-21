import { updateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';
import { CACHE_TAGS } from '@/lib/constants';

export const BlogSources: CollectionConfig = {
  slug: 'blog-sources',
  hooks: {
    afterChange: [
      () => {
        updateTag('blog-sources');
        updateTag(CACHE_TAGS.BLOGS);
      },
    ],
    afterDelete: [
      () => {
        updateTag('blog-sources');
        updateTag(CACHE_TAGS.BLOGS);
      },
    ],
  },
  fields: [
    {
      name: 'source',
      label: 'Source',
      type: 'select',
      options: [
        { label: 'Medium', value: 'medium' },
        { label: 'Custom', value: 'custom' },
      ],
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
    },
  ],
};
