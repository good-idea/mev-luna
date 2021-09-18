export const richText = {
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'footnote',
            title: 'Footnote',
            blockEditor: {
              icon: '†',
            },
            type: 'object',
            fields: [
              {
                title: 'footnote',
                name: 'Note',
                type: 'string',
              },
            ],
          },
        ],
      },
    },
  ],
};
