export const siteSettings = {
  title: 'Site Settings',
  type: 'document',
  name: 'siteSettings',
  fields: [
    {
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      description:
        'Pages that do not have SEO information filled out, or cannot infer these values from other fields will use these defaults for SEO information.',
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage Settings',
    }),
  },
};
