import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 60,
    loginWithUsername: true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
