import * as React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { SEO } from 'src/components/SEO';
import { imageFragment, siteSettingsQuery } from 'src/groq';
import { sanityClient } from 'src/services';
import { NewsItem, SiteSettings } from 'src/types';
import { filterMaybes } from 'src/utils';
import { NewsItemView } from 'src/views/NewsItemView';

interface NewsItemPageProps {
  newsItem: NewsItem;
  siteSettings: SiteSettings;
}

type Params = {
  newsItemSlug: string;
};

const NewsItemPage: React.FC<NewsItemPageProps> = ({
  siteSettings,
  newsItem,
}) => {
  if (!newsItem) {
    return null;
  }

  const mergedSeo = {
    ...siteSettings?.seo,
    title: filterMaybes([newsItem.headline, siteSettings?.seo?.title]).join(
      ' | ',
    ),
  };

  return (
    <>
      <SEO seo={mergedSeo} />
      <NewsItemView newsItem={newsItem} />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  NewsItemPageProps,
  Params
> = async ({ params }) => {
  const newsItemSlug = params?.newsItemSlug;

  if (!newsItemSlug) {
    throw new Error('No news item slug was provided for this route');
  }

  const [siteSettings, newsItem] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    sanityClient.fetch<NewsItem | null>(
      `*[_type == "newsItem" && slug.current == $newsItemSlug][0]{
        _id,
        _type,
        date,
        headline,
        slug,
        description,
        link,
        headingImage {
          ${imageFragment}
        }
      }`,
      { newsItemSlug },
    ),
  ]);

  if (!newsItem) {
    throw new Error(`No news item with slug "${newsItemSlug}" was found`);
  }

  return {
    props: {
      siteSettings,
      newsItem,
    },
    revalidate: 60 * 10,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const newsItems = await sanityClient.fetch<
    Array<{ slug: { current: string } }>
  >(
    `*[_type == "newsItem" && defined(slug.current)]{
      slug
    }`,
  );

  const paths = newsItems.map((newsItem) => ({
    params: { newsItemSlug: newsItem.slug.current },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default NewsItemPage;
