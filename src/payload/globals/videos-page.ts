import type { GlobalConfig } from 'payload';

export const VideosPage: GlobalConfig = {
  slug: 'videosPage',
  hooks: {
    afterChange: [
      () => {
        // updateTag('videosPage');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Videos',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'My videos on various testing related topics',
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
