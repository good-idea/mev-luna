import * as React from 'react';

export const simpleRichText = {
  name: 'simpleRichText',
  title: 'Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [],
      },
    },
  ],
};

export const richText = {
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      marks: {
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'url',
                type: 'url',
                validation: (Rule) => Rule.required(),
                codegen: { required: true },
              },
            ],
          },
          {
            name: 'footnote',
            title: 'Footnote',
            icon: <span>†</span>,
            type: 'object',
            fields: [
              {
                title: 'Text',
                name: 'text',
                type: 'string',
              },
            ],
          },
        ],
      },
    },
  ],
};
