import { ExpandAllReferences } from './utils';

/* Document Types */
export type Project = ExpandAllReferences<Sanity.Schema.Project>;
export type Research = ExpandAllReferences<Sanity.Schema.Research>;
export type Homepage = ExpandAllReferences<Sanity.Schema.Homepage>;
export type InfoPage = ExpandAllReferences<Sanity.Schema.InfoPage>;

export interface SiteSettings {
  projects: Project[];
}

/* Object Types */
export type RichText = ExpandAllReferences<Sanity.Schema.RichText>;
export type Gallery = ExpandAllReferences<Sanity.Schema.Gallery>;
export type RichImage = ExpandAllReferences<Sanity.Schema.RichImage>;
