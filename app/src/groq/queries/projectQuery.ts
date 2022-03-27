import {
  researchLinkFragment,
  imageFragment,
  galleryFragment,
} from '../fragments';

export const projectQuery = `
  _id,
  title,
  slug,
  hoverImage {
    ${imageFragment}
  },
  description,
  materials,
  gallery {
    ${galleryFragment}
  },
  relatedResearch[]->{
    ${researchLinkFragment}
  }
`;
