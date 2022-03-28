import { Gallery, RichImage } from '../types';
import { definitely } from './definitely';
import { isImage } from './typeguards';

export const getMediaImages = (media: Gallery['media']): RichImage[] =>
  definitely(media).reduce<RichImage[]>((allImages, media) => {
    if (isImage(media)) {
      return [...allImages, media];
    }
    return allImages;
  }, []);
