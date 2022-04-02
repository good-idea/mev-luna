import { richTextFragment, seoFragment, galleryFragment } from './shared';
import { projectLinkFragment } from './project';

export const researchLinkFragment = `
  _id,
  _type,
  title,
  slug,
  date,
  materials,
  gallery {
    ${galleryFragment},
  },
  summary[] {
    ${richTextFragment}
  },
  "relatedProjects": *[_type == "project" && ^._id in relatedResearch[]._ref]{
    ${projectLinkFragment}
  }
`;
