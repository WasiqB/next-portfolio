import { revalidateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';
import { CACHE_TAGS } from '@/lib/constants';

export const ProjectsPage: GlobalConfig = {
  slug: 'projectsPage',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('projectsPage', 'max');
        revalidateTag(CACHE_TAGS.PROJECTS, 'max');
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Projects',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'My open source projects about various automation tools',
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
