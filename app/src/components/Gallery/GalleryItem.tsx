import * as React from 'react';
import styled from '@xstyled/styled-components';
import { OneOf, Gallery } from '../../types';
import { Image } from '../Image';
import { Video } from '../Video/Video';

const GalleryItemWrapper = styled.divBox`
  & + & {
    margin-top: 4;
  }
`;

interface GalleryItemProps {
  item: OneOf<Gallery['media']>;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  if (!item) return null;

  let inner: React.ReactNode = null;

  switch (item._type) {
    case 'richImage':
      inner = <Image image={item} sizes={['100vw', '80vw']} />;
      break;
    case 'video':
      inner = <Video video={item} />;
      break;
    default:
      inner = null;
  }

  return <GalleryItemWrapper>{inner}</GalleryItemWrapper>;
};
