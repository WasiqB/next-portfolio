import { updateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'slug',
  },
  hooks: {
    afterChange: [
      () => {
        updateTag('services');
      },
    ],
    afterDelete: [
      () => {
        updateTag('services');
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      label: 'Title',
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
      name: 'icon',
      label: 'Icon',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'feature',
          label: 'Feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliverables',
      label: 'Deliverables',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'step',
          label: 'Step',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          label: 'Title',
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
          name: 'icon',
          label: 'Icon',
          type: 'text',
          required: true,
        },
        {
          name: 'details',
          label: 'Details',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'detail',
              label: 'Detail',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'duration',
          label: 'Duration',
          type: 'text',
          required: true,
        },
        {
          name: 'cost',
          label: 'Cost',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
