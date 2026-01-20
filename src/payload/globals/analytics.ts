import type { GlobalConfig } from 'payload';

export const Analytics: GlobalConfig = {
  slug: 'analytics',
  hooks: {
    afterChange: [
      () => {
        // updateTag('aboutPage');
      },
    ],
  },
  fields: [
    {
      name: 'googleAnalyticsId',
      label: 'Google Analytics ID',
      type: 'text',
      required: true,
    },
  ],
};
