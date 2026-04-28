import imageUrlBuilder from '@sanity/image-url';
import { sharedConfig } from '../config';
import { Image } from '../types';

/**
 * Images
 */

const { projectId, dataset } = sharedConfig.sanity;

const builder = imageUrlBuilder({
  projectId,
  dataset,
});

type ImageBase = Omit<Image, '_type'>;

export const getImageSource = (image: ImageBase) => builder.image(image);

export const getImageUrl = (image?: ImageBase): string | undefined => {
  if (!image) return undefined;
  const source = getImageSource(image);
  return source.url() || undefined;
};
