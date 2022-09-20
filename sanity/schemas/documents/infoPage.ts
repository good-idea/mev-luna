const URL_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
const MAILTO_REGEX = /^mailto:[\S\.]+@\S+\.\S+$/;

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const contactField = {
  type: 'object',
  name: 'contactField',
  title: 'Contact Field',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Required';
          if (!MAILTO_REGEX.test(value) && !isValidUrl(value)) {
            return 'Must be a valid URL or mailto link';
          }
          return true;
        }),
      description:
        'Hint: to link to an email address, enter "mailto:me@mydomain.com"',
      codegen: { required: true },
    },
  ],
};

export const infoPage = {
  type: 'document',
  title: 'Info',
  name: 'infoPage',
  fields: [
    {
      name: 'body',
      title: 'Body',
      type: 'richText',
    },
    {
      name: 'contactFields',
      title: 'Contact',
      type: 'array',
      of: [{ type: 'contactField' }],
    },
    {
      name: 'colophon',
      type: 'object',
      title: 'Colophon',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
          codegen: { required: true },
        },
        {
          name: 'contents',
          title: 'Contents',
          type: 'richText',
          validation: (Rule) => Rule.required(),
          codegen: { required: true },
        },
      ],
    },
    {
      name: 'cv',
      title: 'CV',
      type: 'array',
      of: [{ type: 'cvGroup' }],
    },
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Info Page',
    }),
  },
};
