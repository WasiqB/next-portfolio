import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

export const SponsorTiers: CollectionConfig = {
  slug: 'sponsor-tiers',
  admin: {
    useAsTitle: 'slug',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag('sponsor-tiers', 'max');
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('sponsor-tiers', 'max');
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
    },
    {
      name: 'benefits',
      label: 'Benefits',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'benefit',
          label: 'Benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tierUrl',
      label: 'Tier URL',
      type: 'text',
      required: true,
    },
  ],
};
