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
       * Details - `RegistryReference`
       */
      details?: RichText;

      /**
       * Gallery - `RegistryReference`
       */
      gallery?: Gallery;

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
       * Title - `String`
       */
      title?: string;

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

      /**
       * Caption - `String`
       */
      caption?: string;

      /**
       * Credit - `String`
       */
      credit?: string;
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

    type Document =
      | Homepage
      | InfoPage
      | Project
      | Research
      | Trace
      | SiteSettings;
  }
}
