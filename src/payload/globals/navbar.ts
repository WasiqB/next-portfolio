import { updateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';
import { Button } from '@/payload/blocks/button';

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  hooks: {
    afterChange: [
      () => {
        updateTag('navbar');
      },
    ],
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'lightLogo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'darkLogo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
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
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'hasSubmenu',
          type: 'checkbox',
        },
        {
          name: 'visible',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'subNavItems',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData.hasSubmenu,
          },
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
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'visible',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'buyButton',
      type: 'blocks',
      blocks: [Button],
      maxRows: 1,
    },
  ],
};
