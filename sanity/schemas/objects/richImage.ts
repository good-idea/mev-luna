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
  ],
};
