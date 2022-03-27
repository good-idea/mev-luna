export const project = {
  name: 'project',
  type: 'document',
  title: 'Project',
  fieldsets: [
    { title: 'Main', name: 'main' },
    { title: 'Footer', name: 'footer' },
  ],
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
      options: {
        source: 'title',
      },
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'richImage',
      description:
        'Used on the homepage when hovering over the project link. If no image is supplied, the first image from the Gallery will be used.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText',
      fieldset: 'main',
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
      fieldset: 'main',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      fieldset: 'footer',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (value && value.toString().length !== 4) {
            return 'Value must be a year';
          }
          return true;
        }),
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'richText',
      fieldset: 'footer',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'richText',
      fieldset: 'footer',
    },

    {
      fieldset: 'footer',
      name: 'relatedResearch',
      title: 'Related Research',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'research' }],
        },
      ],
    },

    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
};
