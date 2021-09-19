import { projectLinkFragment } from '../fragments';

export const siteSettingsQuery = `
{
  "projects": *[_type == 'project']{
    ${projectLinkFragment}
  },
  "infoPage": *[_id == "infoPage"][0]
}
`;
