import type { CollectionConfig } from 'payload';

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
    {
      name: 'tier',
      label: 'Tier',
      type: 'relationship',
      required: true,
      relationTo: 'sponsor-tiers',
    },
  ],
};
