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
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      initialValue: '16:9',
      validation: (Rule) =>
        Rule.required().regex(/^[1-9]\d*:[1-9]\d*$/, {
          name: 'aspect ratio',
          message:
            'Aspect ratio must be in the format "width:height", e.g. "16:9".',
        }),
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
