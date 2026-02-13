import { revalidateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';
import { domain } from '@/lib/constants';
import { generateBlurHash } from '../hooks/image-hook';

const getResourceUrl = (src: string) => (src.startsWith('/') ? `${domain}${src}` : src);

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
    afterChange: [
      ({ doc }) => {
        revalidateTag(getResourceUrl(doc.url), 'max');
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag(getResourceUrl(doc.url), 'max');
      },
    ],
  },
};
