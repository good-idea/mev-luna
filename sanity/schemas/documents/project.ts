export const project = {
  name: 'project',
  type: 'document',
  title: 'Project',
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
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'richText',
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
    },
    {
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
  ],
};
