import { ExpandAllReferences } from './utils';

export type Project = ExpandAllReferences<Sanity.Schema.Project>;
export type Research = ExpandAllReferences<Sanity.Schema.Research>;
export type Homepage = ExpandAllReferences<Sanity.Schema.Homepage>;
export type InfoPage = ExpandAllReferences<Sanity.Schema.InfoPage>;

export interface SiteSettings {
  projects: Project[];
}
