import type { GlobalConfig } from 'payload';
import { Image } from '../blocks/image';

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  hooks: {
    afterChange: [
      () => {
        // updateTag('aboutPage');
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'aboutImage',
      label: 'About Image',
      type: 'blocks',
      blocks: [Image],
      maxRows: 1,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'desc',
          label: 'Description Paragraph',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'coreValues',
      label: 'Core Values',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Value',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'text',
      hasMany: true,
      required: true,
    },
  ],
};
