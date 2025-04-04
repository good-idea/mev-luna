import {
  researchLinkFragment,
  imageFragment,
  galleryFragment,
} from '../fragments';
import { seoFragment } from '../fragments/seo';

export const projectQuery = `
  _id,
  title,
  slug,
  hoverImage {
    ${imageFragment}
  },
  description,
  year,
  notes,
  materials,
  gallery {
    ${galleryFragment}
  },
  relatedResearch[]->{
    ${researchLinkFragment}
  },
  ${seoFragment}
`;
