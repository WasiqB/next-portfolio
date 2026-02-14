import type { Block } from 'payload';

export const Button: Block = {
  slug: 'button',
  fields: [
    {
      name: 'icon',
      type: 'text',
    },
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
    {
      name: 'target',
      type: 'select',
      options: [
        {
          label: 'Self',
          value: '_self',
        },
        {
          label: 'Blank',
          value: '_blank',
        },
      ],
      defaultValue: '_self',
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
