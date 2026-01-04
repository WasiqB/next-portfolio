import type { Block } from 'payload';

export const Button: Block = {
  slug: 'button',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
};
