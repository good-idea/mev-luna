export const homepage = {
  title: 'Homepage',
  type: 'document',
  name: 'homepage',
  fields: [
    {
      name: 'projectMenu',
      title: 'Project Menu',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
    { name: 'seo', title: 'Homepage SEO', type: 'seo' },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage Settings',
    }),
  },
};
