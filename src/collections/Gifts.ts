import type { CollectionConfig } from 'payload';

export const Gifts: CollectionConfig = {
  slug: 'gifts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priceRange', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'priceRange',
      type: 'text',
      required: true,
    },
    {
      name: 'imageUrl',
      type: 'text',
    },
    {
      name: 'amazonLink',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      type: 'group',
      fields: [
        {
          name: 'festivals',
          type: 'text',
          hasMany: true,
        },
        {
          name: 'occasions',
          type: 'text',
          hasMany: true,
        },
        {
          name: 'vibes',
          type: 'text',
          hasMany: true,
        },
        {
          name: 'relationships',
          type: 'text',
          hasMany: true,
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'text',
    },
    {
      name: 'seasonalFlag',
      type: 'text',
    },
    {
      name: 'whyItsGreat',
      type: 'text',
      hasMany: true,
    },
  ],
};
