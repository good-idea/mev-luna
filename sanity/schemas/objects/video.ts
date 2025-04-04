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
      name: 'vimeoId',
      title: 'Vimeo ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
  ],
};
