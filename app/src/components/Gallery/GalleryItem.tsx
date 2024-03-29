import * as React from 'react';
import styled from '@xstyled/styled-components';
import { OneOf, Gallery } from '../../types';
import { Image } from '../Image';

const { useCallback } = React;

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
  const renderInner = useCallback(() => {
    switch (item._type) {
      case 'richImage':
        return <Image image={item} sizes={['100vw', '80vw']} />;
      default:
        return null;
    }
  }, [item._type]);
  return (
    <GalleryItemWrapper className="foo">{renderInner()}</GalleryItemWrapper>
  );
};
