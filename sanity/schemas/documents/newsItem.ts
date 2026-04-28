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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      options: {
        source: 'headline',
      },
    },
    {
      name: 'headingImage',
      title: 'Heading Image',
      type: 'richImage',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'linkWithLabel',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
};
