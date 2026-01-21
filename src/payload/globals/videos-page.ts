import { updateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';
import { CACHE_TAGS } from '@/lib/constants';

export const VideosPage: GlobalConfig = {
  slug: 'videosPage',
  hooks: {
    afterChange: [
      () => {
        updateTag('videosPage');
        updateTag(CACHE_TAGS.VIDEOS);
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
