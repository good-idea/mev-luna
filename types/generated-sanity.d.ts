/// <reference types="@sanity-codegen/types" />

declare namespace Sanity {
  namespace Schema {
    /**
     * Homepage
     */
    interface Homepage extends Sanity.Document {
      _type: 'homepage';

      /**
       * Project Menu - `Array`
       */
      projectMenu?: Array<Sanity.KeyedReference<Project>>;

      /**
       * Homepage SEO - `RegistryReference`
       */
      seo?: Seo;
    }

    /**
     * Info
     */
    interface InfoPage extends Sanity.Document {
      _type: 'infoPage';

      /**
       * Body - `RegistryReference`
       */
      body?: RichText;

      /**
       * Contact - `Array`
       */
      contactFields?: Array<Sanity.Keyed<ContactField>>;

      /**
       * CV - `Array`
       */
      cv?: Array<Sanity.Keyed<CvGroup>>;

      /**
       * SEO - `RegistryReference`
       */
      seo?: Seo;
    }

    /**
     * Project
     */
    interface Project extends Sanity.Document {
      _type: 'project';

      /**
       * Title - `String`
       */
      title: string;

      /**
       * Slug - `Slug`
       */
      slug: {
        _type: 'slug';
        current: string;
      };

      /**
       * Hover Image - `RegistryReference`
Used on the homepage when hovering over the project link. If no image is supplied, the first image from the Gallery will be used.
       */
      hoverImage?: RichImage;

      /**
       * Description - `RegistryReference`
       */
      description?: RichText;

      /**
       * Gallery - `RegistryReference`
       */
      gallery?: Gallery;

      /**
       * Year - `Number`
       */
      year?: number;

      /**
       * Materials - `RegistryReference`
       */
      materials?: RichText;

      /**
       * Notes - `RegistryReference`
       */
      notes?: RichText;

      /**
       * Related Research - `Array`
       */
      relatedResearch?: Array<Sanity.KeyedReference<Research>>;

      /**
       * SEO - `RegistryReference`
       */
      seo?: Seo;
    }

    /**
     * News Item
     */
    interface NewsItem extends Sanity.Document {
      _type: 'newsItem';

      /**
       * Date - `Datetime`
       */
      date: string;

      /**
       * Headline - `String`
       */
      headline: string;

      /**
       * Hover Image - `RegistryReference`
       */
      hoverImage?: RichImage;

      /**
       * Link - `Url`
       */
      link?: string;
    }

    /**
     * News (main page)
     */
    interface NewsPage extends Sanity.Document {
      _type: 'newsPage';

      /**
       * SEO - `RegistryReference`
       */
      seo?: Seo;
    }

    /**
     * Research Documents
     */
    interface Research extends Sanity.Document {
      _type: 'research';

      /**
       * Title - `String`
       */
      title: string;

      /**
       * Slug - `Slug`
       */
      slug: {
        _type: 'slug';
        current: string;
      };

      /**
       * Date - `String`
       */
      date: string;

      /**
       * Summary - `RegistryReference`
       */
      summary: RichText;

      /**
       * Materials - `RegistryReference`
       */
      materials?: RichText;

      /**
       * Media - `RegistryReference`
       */
      gallery?: Gallery;

      /**
       * SEO - `RegistryReference`
       */
      seo?: Seo;
    }

    /**
     * Research (main page)
     */
    interface ResearchPage extends Sanity.Document {
      _type: 'researchPage';

      /**
       * SEO - `RegistryReference`
       */
      seo?: Seo;
    }

    /**
     * Trace
     */
    interface Trace extends Sanity.Document {
      _type: 'trace';

      /**
       * Date Added - `Date`
       */
      dateAdded?: string;
    }

    /**
     * Site Settings
     */
    interface SiteSettings extends Sanity.Document {
      _type: 'siteSettings';

      /**
       * Default SEO - `RegistryReference`
Pages that do not have SEO information filled out, or cannot infer these values from other fields will use these defaults for SEO information.
       */
      seo?: Seo;
    }

    type ContactField = {
      _type: 'contactField';

      /**
       * Label - `String`
       */
      label: string;

      /**
       * URL - `String`
Hint: to link to an email address, enter "mailto:me@mydomain.com"
       */
      url: string;
    };

    type Audio = {
      _type: 'audio';
      asset: Sanity.Asset;

      /**
       * Description - `RegistryReference`
       */
      description?: RichText;

      /**
       * Transcription - `RegistryReference`
       */
      transcription?: RichText;
    };

    type Gallery = {
      _type: 'gallery';

      /**
       * Media - `Array`
       */
      media?: Array<
        Sanity.Keyed<RichImage> | Sanity.Keyed<Audio> | Sanity.Keyed<Video>
      >;
    };

    type RichImage = {
      _type: 'richImage';
      asset: Sanity.Asset;
      crop?: Sanity.ImageCrop;
      hotspot?: Sanity.ImageHotspot;

      /**
       * Alt Text - `String`
       */
      altText: string;
    };

    type RichText = Array<Sanity.Keyed<Sanity.Block>>;

    type Seo = {
      _type: 'seo';

      /**
       * SEO: Page Title - `String`
title for the browser tab & search results
       */
      title?: string;

      /**
       * SEO: Description - `Text`
This is the description that will appear underneath the preview link when shared. It should be less than 200 characters
       */
      description?: string;

      /**
       * SEO: Image - `Image`
Best dimensions: 1200 x 600px
       */
      image?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Keywords - `String`
Comma-separated SEO keywords
       */
      keywords?: string;
    };

    type VideoVersion = {
      _type: 'videoVersion';

      /**
       * Label - `String`
       */
      label: string;

      /**
       * Vimeo ID - `String`
       */
      vimeoId: string;
    };

    type Video = {
      _type: 'video';

      /**
       * Title - `String`
       */
      title: string;

      /**
       * Versions - `Array`
       */
      versions?: Array<Sanity.Keyed<VideoVersion>>;
    };

    type CvItem = {
      _type: 'cvItem';

      /**
       * Start year - `Number`
       */
      yearStart: number;

      /**
       * End year - `Number`
(optional) - use this field if the item spans multiple years
       */
      yearEnd?: number;

      /**
       * Title - `String`
       */
      text: string;
    };

    type CvGroup = {
      _type: 'cvGroup';

      /**
       * Title - `String`
       */
      title: string;

      /**
       * Options - `Object`
       */
      options?: {
        /**
         * Group By Year - `Boolean`
         */
        groupByYear?: boolean;
      };

      /**
       * Entries - `Array`
       */
      entries?: Array<Sanity.Keyed<CvItem>>;
    };

    type Document =
      | Homepage
      | InfoPage
      | Project
      | NewsItem
      | NewsPage
      | Research
      | ResearchPage
      | Trace
      | SiteSettings;
  }
}
