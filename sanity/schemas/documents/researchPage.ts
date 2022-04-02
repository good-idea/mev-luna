export const researchPage = {
  type: 'document',
  name: 'researchPage',
  title: 'Research (main page)',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Research Page Settings',
    }),
  },
};
