import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { Gallery as GalleryType } from '../../types';
import { definitely } from '../../utils';
import { GalleryItem } from './GalleryItem';

interface GalleryProps {
  gallery: GalleryType;
}

export const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const { title, media } = gallery;
  return (
    <div>
      {title ? <x.h3>{title}</x.h3> : null}
      {definitely(media).map((item) => (
        <GalleryItem key={item._key} item={item} />
      ))}
    </div>
  );
};
