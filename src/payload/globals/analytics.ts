import type { GlobalConfig } from 'payload';

export const Analytics: GlobalConfig = {
  slug: 'analytics',
  fields: [
    {
      name: 'googleAnalyticsId',
      label: 'Google Analytics ID',
      type: 'text',
      required: true,
    },
  ],
};
