import * as React from 'react';
import { GetStaticProps } from 'next';
import { NewsView } from '../views/NewsView';
import { SEO } from 'src/components/SEO';
import { sanityClient } from '../services';
import { NewsPage, NewsItem, SiteSettings } from '../types';
import { siteSettingsQuery } from 'src/groq';
import { definitely } from 'src/utils';

interface NewsProps {
  newsItems?: NewsItem[];
  newsPage: NewsPage;
  siteSettings: SiteSettings;
}

const News: React.FC<NewsProps> = ({ siteSettings, newsItems, newsPage }) => {
  const mergedSeo = {
    ...siteSettings?.seo,
    title: definitely(['News', siteSettings?.seo?.title]).join(' | '),
    ...newsPage?.seo,
  };

  return (
    <>
      <SEO seo={mergedSeo} />
      <NewsView newsItems={newsItems || []} newsPage={newsPage} />
    </>
  );
};

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const [siteSettings, { newsItems, newsPage }] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    sanityClient.fetch<{
      newsItems: NewsItem[];
      newsPage: NewsPage;
    }>(
      `{
      "newsItems": *[_type == "newsItem"][],
      "newsPage": *[_type == "newsPage"][0]
    }
    `,
    ),
  ]);
  return {
    props: {
      siteSettings,
      newsItems,
      newsPage,
    },
    revalidate: 60 * 10,
  };
};

export default News;
