import { richTextFragment, seoFragment, galleryFragment } from './shared';

export const researchFragment = `
  _id,
  _type,
  title,
  slug,
  date,
  summary {
    ${richTextFragment}
  }
  details,
  gallery {
    ${galleryFragment}
  },
  seo {
    ${seoFragment}
  }
`;

export const researchLinkFragment = `
  _id,
  _type,
  title,
  slug,
  date,
  summary {
    ${richTextFragment}
  }
`;
