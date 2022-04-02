export const gallery = {
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          type: 'richImage',
        },
        {
          type: 'audio',
        },
        {
          type: 'video',
        },
      ],
    },
  ],
};
