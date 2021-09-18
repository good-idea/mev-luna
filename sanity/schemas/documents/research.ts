export const research = {
  name: 'research',
  title: 'Research Documents',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'richText',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'details',
      title: 'Details',
      type: 'richText',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'richImage' }],
    },
  ],
};
