export const cvItem = {
  type: 'object',
  name: 'cvItem',
  title: 'CV Item',
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (value && value.toString().length !== 4) {
            return 'Value must be a year';
          }
          return true;
        }),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'year',
    },
  },
};

export const cvGroup = {
  type: 'object',
  name: 'cvGroup',
  title: 'CV Group',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      title: 'Options',
      name: 'options',
      type: 'object',
      fields: [
        {
          name: 'groupByYear',
          title: 'Group By Year',
          type: 'boolean',
        },
      ],
    },
    {
      title: 'Entries',
      name: 'entries',
      type: 'array',
      options: {
        editModal: 'popover',
      },
      of: [
        {
          type: 'cvItem',
        },
      ],
    },
  ],
};
