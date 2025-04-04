import { PortableTextBlock } from '@portabletext/types';

/**
 * Shared
 */
export type SanityDocument = {
  _id: string;
  _type: string;
};

export type KeyedArray<T> = Array<T & { _key: string }>;

/* Document Types */
export type Homepage = SanityDocument & {
  _type: 'homepage';
  projectMenu: KeyedArray<Project>;
};

export type InfoPage = SanityDocument & {
  _type: 'infoPage';
  body: RichText;
  contactFields: KeyedArray<{
    label: string;
    url: string;
  }>;
  colophon: {
    label: string;
    contents: RichText;
  };
  cv: KeyedArray<CVGroup>;
  seo: SEO;
};

export type NewsItem = SanityDocument & {
  _type: 'newsItem';
  date: string;
  headline: string;
  hoverImage?: RichImage;
  link?: string;
};

export type NewsPage = SanityDocument & {
  _type: 'newsPage';
  seo?: SEO;
};

export type Project = SanityDocument & {
  _type: 'project';
  title: string;
  slug: Slug;
  hoverImage?: RichImage;
  description?: RichText;
  gallery?: Gallery;
  year: string;
  materials?: RichText;
  notes?: RichText;
  relatedResearch?: KeyedArray<Research>;
};

export type Research = SanityDocument & {
  _type: 'research';
  title: string;
  slug: Slug;
  date: string;
  summary: RichText;
  materials?: RichText;
  gallery?: Gallery;
  relatedProjects?: Project[];
};

export type ResearchPage = SanityDocument & {
  _type: 'researchPage';
  seo?: SEO;
};

export type SiteSettings = SanityDocument & {
  _type: 'siteSettings';
  seo?: SEO;
};

/**
 * Object Types
 */

export type RichText = PortableTextBlock[];

export type Image = {
  _type: 'image';
  _key: string;
  altText: string;
  caption: null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  asset?: {
    _id: string;
    _ref: string;
    url: string;
    metadata: {
      lqip: string;
      dimensions: {
        aspectRatio: number;
        width: number;
        height: number;
      };
    };
  };
};

/* An enhanced image field that includes a caption & alt text */
export type RichImage = Omit<Image, '_type'> & {
  _type: 'richImage';
  altText: string;
  caption: string | null;
};

export type Slug = { current: string };

export type CVItem = {
  _type: 'cvItem';
  yearStart: number;
  yearEnd: number;
  text: string;
};

export type CVGroup = {
  title: string;
  options: {
    groupByYear: number;
  };
  entries?: KeyedArray<CVItem>;
};

export type Gallery = {
  media: KeyedArray<Media>;
};

export type SEO = {
  title: string;
  description: string;
  image: Image;
  keywords: string;
};

export type Video = {
  _type: 'video';
  title: string;
  aspectRatio: string;
  vimeoId: string;
};

export type Media = RichImage | Video;
// export type Media = Audio | Video | RichImage
// export type Audio = {}
// export type Video = {}
