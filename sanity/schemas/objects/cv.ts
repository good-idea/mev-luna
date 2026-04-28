import { blocksToPlainText } from '../../lib/blocksToPlainText';

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
      title: 'Title (deprecated)',
      hidden: true,
      type: 'string',
      readonly: true,
      codegen: { required: true },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      text: 'text',
      title: 'title',
      yearStart: 'yearStart',
      yearEnd: 'yearEnd',
    },
    prepare: ({ text, title, yearStart, yearEnd }: Record<string, any>) => {
      const subtitle =
        yearStart && yearEnd
          ? [yearStart, yearEnd].join('-')
          : yearStart || undefined;
      return {
        title: blocksToPlainText(title) || text,
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
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }: Record<string, any>) => ({
      title: title,
    }),
  },
};
