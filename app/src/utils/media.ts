import { Gallery, RichImage } from '../types';
import { filterMaybes } from './filterMaybes';
import { isImage } from './typeguards';

export const getMediaImages = (media: Gallery['media']): RichImage[] =>
  filterMaybes(media).reduce<RichImage[]>((allImages, media) => {
    if (isImage(media)) {
      return [...allImages, media];
    }
    return allImages;
  }, []);
