export const newsPage = {
  type: 'document',
  title: 'News (main page)',
  name: 'newsPage',
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
      title: 'News Page Settings',
    }),
  },
};
