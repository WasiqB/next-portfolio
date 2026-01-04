import type { Block } from 'payload';

export const Image: Block = {
  slug: 'image',
  fields: [
    {
      name: 'src',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};
