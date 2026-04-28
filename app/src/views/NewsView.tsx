import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { NewsItem, NewsPage } from '../types';
import { Strong } from '../components/Text';
import { formatNewsDate } from './newsUtils';
import Link from 'next/link';

interface NewsLineItemProps {
  newsItem: NewsItem;
}

const NewsLineItem: React.FC<NewsLineItemProps> = ({ newsItem }) => {
  const { slug, headline, date } = newsItem;

  return (
    <x.li listStyleType="none" mb={2}>
      <Link href={`/news/${slug.current}`}>
        <x.span fontSize={4} mr={4}>
          <Strong>{formatNewsDate(date)}</Strong>
        </x.span>
        <x.span fontSize={2}>
          <Strong>{headline}</Strong>
        </x.span>
      </Link>
    </x.li>
  );
};

interface NewsViewProps {
  newsItems: NewsItem[];
  newsPage: NewsPage;
}

export const NewsView: React.FC<NewsViewProps> = ({ newsItems }) => {
  return (
    <x.ul p={0} m={0}>
      {newsItems.map((newsItem) => (
        <NewsLineItem key={newsItem._id} newsItem={newsItem} />
      ))}
    </x.ul>
  );
};
