import * as React from 'react';
import { GetStaticProps } from 'next';
import { SEO } from 'src/components/SEO';
import { siteSettingsQuery } from 'src/groq';
import { sanityClient } from 'src/services';
import { NewsItem, NewsPage, SiteSettings } from 'src/types';
import { filterMaybes } from 'src/utils';
import { NewsView } from 'src/views/NewsView';

interface NewsProps {
  newsItems?: NewsItem[];
  newsPage: NewsPage;
  siteSettings: SiteSettings;
}

const News: React.FC<NewsProps> = ({ siteSettings, newsItems, newsPage }) => {
  const mergedSeo = {
    ...siteSettings?.seo,
    title: filterMaybes(['News', siteSettings?.seo?.title]).join(' | '),
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
  await import('src/config/server');

  const [siteSettings, { newsItems, newsPage }] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    sanityClient.fetch<{
      newsItems: NewsItem[];
      newsPage: NewsPage;
    }>(`{
      "newsItems": *[_type == "newsItem"] | order(date desc) {
        _id,
        _type,
        date,
        headline,
        slug
      },
      "newsPage": *[_type == "newsPage"][0]
    }`),
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
