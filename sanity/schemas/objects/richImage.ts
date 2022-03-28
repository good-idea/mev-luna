export const richImage = {
  name: 'richImage',
  type: 'image',
  title: 'Image',
  fields: [
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'credit',
      title: 'Credit',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
  ],
};
