import * as React from 'react';
import { GetStaticProps } from 'next';
import { NewsView } from '../views/NewsView';
// import { SEO } from '../components/SEO';
import { sanityClient } from '../services';
import { NewsPage, NewsItem } from '../types';

interface NewsProps {
  newsItems?: NewsItem[];
  newsPage: NewsPage;
}

const News: React.FC<NewsProps> = ({ newsItems, newsPage }) => (
  <>
    <NewsView newsItems={newsItems || []} newsPage={newsPage} />
  </>
);

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const { newsItems, newsPage } = await sanityClient.fetch<{
    newsItems: NewsItem[];
    newsPage: NewsPage;
  }>(
    `{
      "newsItems": *[_type == "newsItem"][],
      "newsPage": *[_type == "newsPage"][0]
    }
    `,
  );
  return {
    props: {
      newsItems,
      newsPage,
    },
    revalidate: 60 * 10,
  };
};

export default News;
