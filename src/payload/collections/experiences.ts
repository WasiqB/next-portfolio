import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

export const Experiences: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag('experience', 'max');
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('experience', 'max');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      label: 'Period',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
    },
    {
      name: 'responsibilities',
      label: 'Responsibilities',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'responsibility',
          label: 'Responsibility',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'text',
      required: true,
      hasMany: true,
    },
  ],
};
