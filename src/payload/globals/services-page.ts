import { revalidateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('servicesPage', 'max');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Services',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'My freelancing services for different aspects of automation',
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
