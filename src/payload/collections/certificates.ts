import { updateTag } from 'next/cache';
import type { CollectionConfig } from 'payload';

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      () => {
        updateTag('certificates');
      },
    ],
    afterDelete: [
      () => {
        updateTag('certificates');
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
      name: 'issuer',
      label: 'Issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'issued',
      label: 'Issued Date',
      type: 'text',
      required: true,
    },
    {
      name: 'verifyUrl',
      label: 'Verification URL',
      type: 'text',
    },
  ],
};
