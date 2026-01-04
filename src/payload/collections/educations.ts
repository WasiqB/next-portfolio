import type { CollectionConfig } from 'payload';

export const Educations: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      () => {
        // updateTag('educations');
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
      name: 'university',
      label: 'University',
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
    },
  ],
};
