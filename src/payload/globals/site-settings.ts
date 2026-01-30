import { revalidateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('servicesPage', 'max');
      },
    ],
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      required: true,
      defaultValue: 'Wasiq Bhamla',
    },
    {
      name: 'titleTemplate',
      label: 'Title Template',
      type: 'text',
      required: true,
      defaultValue: '%s | Wasiq Bhamla',
      admin: {
        description: 'Use %s where the page title should be inserted.',
      },
    },
    {
      name: 'defaultLanguage',
      label: 'Default Language (Locale)',
      type: 'text',
      required: true,
      defaultValue: 'en_US',
    },
  ],
};
