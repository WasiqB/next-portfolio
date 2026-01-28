import { revalidateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';

export const SponsorsPage: GlobalConfig = {
  slug: 'sponsorsPage',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('sponsorsPage', 'max');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Sponsors',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'My sponsors for my open source project contributions',
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
