import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { Image } from '../components/Image';
import { RichText } from '../components/RichText';
import { Strong } from '../components/Text';
import { NewsItem } from '../types';
import { formatNewsDate } from './newsUtils';

interface NewsItemViewProps {
  newsItem: NewsItem;
}

export const NewsItemView: React.FC<NewsItemViewProps> = ({ newsItem }) => {
  const { headline, date, link, headingImage, description } = newsItem;

  return (
    <x.div maxWidth="800px" mx="auto">
      <x.h1 fontSize={2} mt={0} mb={4}>
        {headline}
      </x.h1>
      <x.p color="grays.6" mt={0} mb={4} fontSize={4}>
        <Strong>{formatNewsDate(date)}</Strong>
      </x.p>
      {link ? (
        <x.p mt={0} mb={4} fontSize={4}>
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>
        </x.p>
      ) : null}
      {headingImage ? (
        <x.div mb={4}>
          <Image image={headingImage} sizes={['100vw', '800px']} />
        </x.div>
      ) : null}
      <RichText text={description} />
    </x.div>
  );
};
