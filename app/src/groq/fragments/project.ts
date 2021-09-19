import { galleryFragment, imageFragment } from './shared';
import { researchLinkFragment } from './research';

export const projectFragment = `
  _type,
  _id,
  title,
  slug,
  hoverImage {
    ${imageFragment}
  },
  description,
  materials,
  gallery[]{
    ${galleryFragment}
  },
  relatedResearch[]->{
    ${researchLinkFragment}
  },
`;

export const projectLinkFragment = `
  _type,
  _id,
  title,
  slug,
  hoverImage {
    ${imageFragment}
  }
`;
