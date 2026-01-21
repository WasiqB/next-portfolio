import { updateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

export const BlogSources: CollectionConfig = {
  slug: 'blog-sources',
  hooks: {
    afterChange: [
      () => {
        updateTag('blogSources');
      },
    ],
    afterDelete: [
      () => {
        updateTag('blogSources');
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
