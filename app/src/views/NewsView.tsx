import * as React from 'react';
import styled, { x } from '@xstyled/styled-components';
import { NewsItem } from '../types';
import { Strong } from '../components/Text';

interface NewsLineItemProps {
  newsItem: NewsItem;
}

const Wrapper = styled.div`
  padding-left: 290px;
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear().toString().slice(2),
  ].join('/');
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const time = [hours > 12 ? hours - 12 : hours, minutes].join(':');

  const amPm = date.getHours() < 12 ? 'am' : 'pm';
  return `${year} at ${time}${amPm}`;
};

const NewsLineItem: React.FC<NewsLineItemProps> = ({ newsItem }) => {
  const { headline, date, link } = newsItem;
  const inner = () => (
    <>
      <x.span fontSize={4} mr={4}>
        <Strong>{formatDate(date)}</Strong>
      </x.span>
      <x.span fontSize={2}>
        <Strong>{headline}</Strong>
      </x.span>
    </>
  );

  return link ? <a href={link}>{inner()}</a> : <>{inner()}</>;
};

interface NewsViewProps {
  newsItems: NewsItem[];
}

export const NewsView: React.FC<NewsViewProps> = ({ newsItems }) => {
  return (
    <Wrapper>
      <ul>
        {newsItems.map((newsItem) => (
          <NewsLineItem key={newsItem._id} newsItem={newsItem} />
        ))}
      </ul>
    </Wrapper>
  );
};
