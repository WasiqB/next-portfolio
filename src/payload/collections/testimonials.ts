import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Client', value: 'client' },
        { label: 'General', value: 'general' },
        { label: 'Colleague', value: 'colleague' },
      ],
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
      required: false,
      defaultValue: false,
    },
  ],
};
