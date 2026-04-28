import { defineField, defineType } from 'sanity';

export const linkWithLabel = defineType({
  type: 'object',
  name: 'linkWithLabel',
  title: 'Link With Label',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
