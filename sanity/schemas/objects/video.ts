export const videoVersion = {
  title: 'Video Version',
  name: 'videoVersion',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'vimeoId',
      title: 'Vimeo ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
  ],
};

export const video = {
  title: 'Video',
  name: 'video',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'versions',
      title: 'Versions',
      type: 'array',
      of: [{ type: 'videoVersion' }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
