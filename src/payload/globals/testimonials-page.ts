import { updateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';

export const TestimonialsPage: GlobalConfig = {
  slug: 'testimonialsPage',
  hooks: {
    afterChange: [
      () => {
        updateTag('testimonialsPage');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Testimonials',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'What my clients, colleagues and friends say about me?',
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
