import type { GlobalConfig } from 'payload';

export const ProjectsPage: GlobalConfig = {
  slug: 'projectsPage',
  hooks: {
    afterChange: [
      () => {
        // updateTag('projectsPage');
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
