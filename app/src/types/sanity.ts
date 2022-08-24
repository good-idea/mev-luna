import { OneOf, ExpandAllReferences } from './utils';

/* Document Types */
export type Homepage = ExpandAllReferences<Sanity.Schema.Homepage>;
export type InfoPage = ExpandAllReferences<Sanity.Schema.InfoPage>;
export type Project = ExpandAllReferences<Sanity.Schema.Project>;
export type ResearchPage = ExpandAllReferences<Sanity.Schema.ResearchPage>;
export type Research = ExpandAllReferences<Sanity.Schema.Research> & {
  relatedProjects?: Project[];
};
export type NewsItem = ExpandAllReferences<Sanity.Schema.NewsItem>;
export type NewsPage = ExpandAllReferences<Sanity.Schema.NewsPage>;

export interface SiteSettings {
  projects: Project[];
}

/* Object Types */
export type RichText = ExpandAllReferences<Sanity.Schema.RichText>;
export type Gallery = ExpandAllReferences<Sanity.Schema.Gallery>;
export type RichImage = ExpandAllReferences<Sanity.Schema.RichImage>;
export type CVGroup = ExpandAllReferences<Sanity.Schema.CvGroup>;
export type CVItem = ExpandAllReferences<Sanity.Schema.CvItem>;
export type Audio = Sanity.Schema.Audio;
export type Video = Sanity.Schema.Video;

export type Media = RichImage | Audio | Video | OneOf<Gallery['media']>;
