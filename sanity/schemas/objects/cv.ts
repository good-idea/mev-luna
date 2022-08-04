const validateYear = (value) => {
  if (value && value.toString().length !== 4) {
    return 'Value must be a year';
  }
  return true;
};

export const cvItem = {
  type: 'object',
  name: 'cvItem',
  title: 'CV Item',
  fields: [
    {
      name: 'yearStart',
      title: 'Start year',
      type: 'number',
      validation: (Rule) => Rule.required().custom(validateYear),
      codegen: { required: true },
    },
    {
      name: 'yearEnd',
      title: 'End year',
      type: 'number',
      validation: (Rule) => Rule.custom(validateYear),
      description:
        '(optional) - use this field if the item spans multiple years',
    },
    {
      name: 'text',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
  ],
  preview: {
    select: {
      title: 'text',
      yearStart: 'yearStart',
      yearEnd: 'yearEnd',
    },
    prepare: ({ title, yearStart, yearEnd }) => {
      const subtitle =
        yearStart && yearEnd
          ? [yearStart, yearEnd].join('-')
          : yearStart || undefined;
      return {
        title,
        subtitle,
      };
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
      of: [
        {
          type: 'cvItem',
        },
      ],
    },
  ],
};
