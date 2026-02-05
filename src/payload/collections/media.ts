import type { CollectionConfig } from 'payload';
import { generateBlurHash } from '../hooks/image-hook';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  },
  hooks: {
    beforeValidate: [generateBlurHash],
  },
};
