const URL_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
const MAILTO_REGEX = /^mailto:\S+@\S+\.\S+$/;

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
          if (!MAILTO_REGEX.test(value) || !URL_REGEX.test(value)) {
            return 'Must be a valid URL or mailto link';
          }
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
  ],
};
