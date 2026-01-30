import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

export const Socials: CollectionConfig = {
  slug: 'socials',
  admin: {
    useAsTitle: 'platform',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag('socials', 'max');
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('socials', 'max');
      },
    ],
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'X', value: 'x' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'GitHub', value: 'github' },
        { label: 'Youtube', value: 'youtube' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'ariaLabel',
      type: 'text',
      required: true,
    },
  ],
};
