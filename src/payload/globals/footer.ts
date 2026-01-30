import { revalidateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('footer', 'max');
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
      name: 'socialSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Follow me on my Socials',
          required: true,
        },
      ],
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
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
              name: 'visible',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'textarea',
      defaultValue: 'Build with ❤️ from 🇮🇳. \nAll rights reserved.',
      required: true,
    },
  ],
};
