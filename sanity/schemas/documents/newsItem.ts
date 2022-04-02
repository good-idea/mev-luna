export const newsItem = {
  type: 'document',
  title: 'News Item',
  name: 'newsItem',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'richImage',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
};
