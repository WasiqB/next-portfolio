import type { GlobalConfig } from 'payload';
import { Button } from '@/payload/blocks/button';
import { Image } from '../blocks/image';

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  hooks: {
    afterChange: [
      () => {
        // updateTag('homePage');
      },
    ],
  },
  fields: [
    {
      name: 'heroSection',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'typingTexts',
          label: 'Typing Texts',
          type: 'text',
          required: true,
          hasMany: true,
        },
        {
          name: 'typingDelay',
          label: 'Typing Delay',
          type: 'number',
          required: false,
          defaultValue: 2000,
        },
        {
          name: 'bio',
          label: 'Bio',
          type: 'textarea',
          required: true,
        },
        {
          name: 'primary',
          label: 'Primary Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
        {
          name: 'secondary',
          label: 'Secondary Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
        {
          name: 'profileImage',
          label: 'Profile Image',
          type: 'blocks',
          blocks: [Image],
          maxRows: 1,
          required: true,
        },
      ],
    },
    {
      name: 'projectSection',
      label: 'Project Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'projectUrls',
          label: 'Project URLs',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'allProjectsButton',
          label: 'All Projects Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'serviceSection',
      label: 'Service Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'allServicesButton',
          label: 'All Services Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
        {
          name: 'bookCallButton',
          label: 'Book Call Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'blogSection',
      label: 'Blog Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'viewAllButton',
          label: 'View All Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'videoSection',
      label: 'Video Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'channelUrl',
          label: 'Channel URL',
          type: 'text',
          required: true,
        },
        {
          name: 'channelId',
          label: 'Channel ID',
          type: 'text',
          required: true,
        },
        {
          name: 'viewAllButton',
          label: 'View All Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'testimonialSection',
      label: 'Testimonial Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'viewAllButton',
          label: 'View All Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'sponsorSection',
      label: 'Sponsor Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'viewAllButton',
          label: 'View All Button',
          type: 'blocks',
          blocks: [Button],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'keywords',
          label: 'Keywords',
          type: 'text',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
};
