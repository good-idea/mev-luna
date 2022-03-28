import { richTextFragment, seoFragment, galleryFragment } from './shared';
import { projectLinkFragment } from './project';

export const researchFragment = `
  _id,
  _type,
  title,
  slug,
  date,
  details[]{
    ${richTextFragment}
  },
  gallery {
    ${galleryFragment}
  },
  seo {
    ${seoFragment}
  },
  "relatedProjects": *[_type == "project" && ^._id in relatedResearch[]._ref]{
    ${projectLinkFragment}
  }
`;

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
