import * as React from 'react';
import { Gallery as GalleryType } from '../../types';
import { definitely } from '../../utils';
import { GalleryItem } from './GalleryItem';

interface GalleryProps {
  gallery: GalleryType;
}

export const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const { media } = gallery;
  return (
    <div>
      {definitely(media).map((item) => (
        <GalleryItem key={item._key} item={item} />
      ))}
    </div>
  );
};
