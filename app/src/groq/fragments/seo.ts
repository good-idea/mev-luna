import { imageFragment } from './shared';

export const seoFragment = `
  seo {
    title,
    description,
    image {
      ${imageFragment}
    },
    keywords
  }
`;
