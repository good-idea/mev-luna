export const homepage = {
  title: 'Homepage',
  type: 'document',
  name: 'homepage',
  fields: [{ name: 'seo', title: 'Homepage SEO', type: 'seo' }],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage Settings',
    }),
  },
};
