import * as React from 'react';
import styled, { x } from '@xstyled/styled-components';
import { NewsItem } from '../types';
import { Strong } from '../components/Text';
import { Image } from '../components/Image';

interface NewsLineItemProps {
  newsItem: NewsItem;
}

const HoverImageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 270px;
  opacity: 0;
`;

const LineItemWrapper = styled.li`
  padding-left: 290px;
  position: relative;
  list-style-type: none;

  &:hover ${HoverImageWrapper} {
    opacity: 1;
  }
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
  const { headline, date, link, hoverImage } = newsItem;
  const inner = () => (
    <LineItemWrapper>
      {hoverImage ? (
        <HoverImageWrapper>
          <Image image={hoverImage} sizes={['300px']} />
        </HoverImageWrapper>
      ) : null}

      <x.span fontSize={4} mr={4}>
        <Strong>{formatDate(date)}</Strong>
      </x.span>
      <x.span fontSize={2}>
        <Strong>{headline}</Strong>
      </x.span>
    </LineItemWrapper>
  );

  return link ? <a href={link}>{inner()}</a> : <>{inner()}</>;
};

interface NewsViewProps {
  newsItems: NewsItem[];
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
