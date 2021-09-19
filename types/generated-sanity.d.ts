/// <reference types="@sanity-codegen/types" />

declare namespace Sanity {
  namespace Schema {
    /**
     * Homepage
     */
    interface Homepage extends Sanity.Document {
      _type: 'homepage';

      /**
       * SEO - `seo`
       */
      seo?: Seo;
    }

    /**
     * Info
     */
    interface InfoPage extends Sanity.Document {
      _type: 'infoPage';

      /**
       * Body - `richText`
       */
      body?: RichText;

      /**
       * Contact - `array`
       */
      contactFields?: Array<Sanity.Keyed<ContactField>>;

      /**
       * SEO - `seo`
       */
      seo?: Seo;
    }

    /**
     * Project
     */
    interface Project extends Sanity.Document {
      _type: 'project';

      /**
       * Title - `string`
       */
      title: string;

      /**
       * Slug - `slug`
       */
      slug: {
        _type: 'slug';
        current: string;
      };

      /**
       * Hover Image - `richImage`
Used on the homepage when hovering over the project link. If no image is supplied, the first image from the Gallery will be used.
       */
      hoverImage?: RichImage;

      /**
       * Description - `richText`
       */
      description?: RichText;

      /**
       * Materials - `richText`
       */
      materials?: RichText;

      /**
       * Gallery - `gallery`
       */
      gallery?: Gallery;

      /**
       * Related Research - `array`
       */
      relatedResearch?: Array<Sanity.KeyedReference<Research>>;

      /**
       * SEO - `seo`
       */
      seo?: Seo;
    }

    /**
     * Research Documents
     */
    interface Research extends Sanity.Document {
      _type: 'research';

      /**
       * Title - `string`
       */
      title: string;

      /**
       * Slug - `slug`
       */
      slug: {
        _type: 'slug';
        current: string;
      };

      /**
       * Date - `string`
       */
      date: string;

      /**
       * Summary - `richText`
       */
      summary: RichText;

      /**
       * Details - `richText`
       */
      details?: RichText;

      /**
       * Gallery - `gallery`
       */
      gallery?: Gallery;

      /**
       * SEO - `seo`
       */
      seo?: Seo;
    }

    /**
     * Trace
     */
    interface Trace extends Sanity.Document {
      _type: 'trace';

      /**
       * Date Added - `date`
       */
      dateAdded?: string;
    }

    type ContactField = {
      _type: 'contactField';

      /**
       * Label - `string`
       */
      label: string;

      /**
       * URL - `string`
Hint: to link to an email address, enter "mailto:me@mydomain.com"
       */
      url: string;
    };

    type Audio = {
      _type: 'audio';
      asset: Sanity.Asset;

      /**
       * Description - `richText`
       */
      description?: RichText;

      /**
       * Transcription - `richText`
       */
      transcription?: RichText;
    };

    type Gallery = {
      _type: 'gallery';

      /**
       * Title - `string`
       */
      title?: string;

      /**
       * Media - `array`
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
       * Alt Text - `string`
       */
      altText: string;

      /**
       * Credit - `string`
       */
      credit?: string;
    };

    type RichText = Array<Sanity.Keyed<Sanity.Block>>;

    type Seo = {
      _type: 'seo';

      /**
       * SEO: Page Title - `string`
title for the browser window
       */
      title?: string;

      /**
       * Meta Title - `string`
title for search results
       */
      metaTitle?: string;

      /**
       * SEO: Description - `text`
This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters
       */
      description?: string;

      /**
       * SEO: Image - `image`
Best dimensions: 1200 x 600px
       */
      image?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Keywords - `string`
Comma-separated SEO keywords
       */
      keywords?: string;
    };

    type VideoVersion = {
      _type: 'videoVersion';

      /**
       * Label - `string`
       */
      label?: string;

      /**
       * Vimeo ID - `string`
       */
      vimeoId: string;
    };

    type Video = {
      _type: 'video';

      /**
       * Title - `string`
       */
      title: string;

      /**
       * Versions - `array`
       */
      versions?: Array<Sanity.Keyed<VideoVersion>>;
    };

    type Documents = Homepage | InfoPage | Project | Research | Trace;
  }
}
