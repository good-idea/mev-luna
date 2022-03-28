import { imageFragment } from './shared';

export const projectLinkFragment = `
  _type,
  _id,
  title,
  slug,
  hoverImage {
    ${imageFragment}
  }
`;
