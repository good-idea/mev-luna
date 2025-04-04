import { seoFragment } from '../fragments/seo';

export const siteSettingsQuery = `
  *[_id == 'siteSettings'][0]{
    ${seoFragment}
  }
`;
