import * as React from 'react';
import Link from 'next/link';
import { x, styled } from '@xstyled/styled-components';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Strong } from '../components/Text';
import { NewsItem, NewsPage } from '../types';
import { formatNewsDate } from './newsUtils';
import * as mediaQueries from '../theme/mediaQueries';

interface NewsLineItemProps {
  newsItem: NewsItem;
}

const COL_1 = 150;
const GAP = 25;

const MainWrapper = styled.divBox`
  max-width: 1200px;
`;

const NewsletterSignupWrapper = styled.divBox`
  ${mediaQueries.desktop} {
    margin-left: ${COL_1 + GAP}px;
  }
`;

const NewsItemWrapper = styled.divBox`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: baseline;

  ${mediaQueries.desktop} {
    display: grid;
    grid-column-gap: ${GAP}px;
    grid-template-columns: ${COL_1}px 1fr;
  }
`;

const NewsLineItemDate = styled.spanBox`
  font-size: 4;
  font-weight: 500;
  ${mediaQueries.desktop} {
    text-align: right;
  }
`;

const NewsLineItemTitle = styled.spanBox`
  font-size: 3;
  ${mediaQueries.desktop} {
    font-size: 2;
  }
`;

const NewsLineItem: React.FC<NewsLineItemProps> = ({ newsItem }) => {
  const { slug, headline, date } = newsItem;

  return (
    <x.li listStyleType="none" mb={2}>
      <Link href={`/news/${slug.current}`}>
        <NewsItemWrapper>
          <NewsLineItemDate>{formatNewsDate(date)}</NewsLineItemDate>
          <NewsLineItemTitle>
            <Strong>{headline}</Strong>
          </NewsLineItemTitle>
        </NewsItemWrapper>
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
    <MainWrapper>
      <NewsletterSignupWrapper>
        <NewsletterSignup />
      </NewsletterSignupWrapper>
      <x.ul p={0} m={0}>
        {newsItems.map((newsItem) => (
          <NewsLineItem key={newsItem._id} newsItem={newsItem} />
        ))}
      </x.ul>
    </MainWrapper>
  );
};
