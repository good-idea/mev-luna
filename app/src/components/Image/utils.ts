import { Maybe, RichImage } from '../../types';
import { getImageSource } from '../../utils';
import { BREAKPOINT_QUERIES } from './constants';

export interface ImageDetails {
  src: string | null | void;
  altText?: string | null;
  srcSet?: string | null;
  srcSetWebp?: string | null;
  caption?: string | null;
}

interface ImageWidth {
  width: number;
  src: Maybe<string>;
}

const buildSrcSet = (widths: ImageWidth[]): string =>
  widths.map(({ src, width }) => `${src} ${width}w`).join(', ');

/**
 * The default sizes used to create the srcSet
 */
const defaultSrcsetSizes: number[] = [100, 300, 600, 800, 1200, 1600, 2200];

export const getImageDetails = (
  image: RichImage,
  sizes: number[] = defaultSrcsetSizes,
): ImageDetails | null => {
  if (!image?.asset) return null;
  const source = getImageSource(image);
  const src = source.url();
  const srcSet = buildSrcSet(
    sizes.map((size) => {
      return {
        width: size,
        src: source.width(size).url(),
      };
    }),
  );
  const srcSetWebp =
    // @ts-ignore
    image.asset.extension === 'gif'
      ? null
      : buildSrcSet(
          sizes.map((size) => {
            return {
              width: size,
              src: source.width(size).format('webp').url(),
            };
          }),
        );

  const { altText } = image;

  const caption = image._type === 'richImage' ? image?.caption : undefined;

  return { caption, src, srcSet, srcSetWebp, altText };
};

const defaultCrop = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

export const getAspectRatio = (
  image?: RichImage | null | void,
): number | void => {
  if (!image) return undefined;
  // @ts-ignore === this should be fixed when sanity-codegen releases a new version
  const dimensions = image.asset?.metadata?.dimensions;
  if (!dimensions) return undefined;
  const crop = image.crop ?? defaultCrop;
  const { width, height } = dimensions;
  if (!width || !height) {
    return undefined;
  }
  const { left, right, bottom, top } = crop;
  if (
    left === null ||
    left === undefined ||
    right === null ||
    right === undefined ||
    bottom === null ||
    bottom === undefined ||
    top === null ||
    top === undefined
  ) {
    return height / width;
  }
  const w = width * (1 - left - right);
  const h = height * (1 - bottom - top);
  const aspectRatio = h / w;
  return aspectRatio;
};

export const getSizes = (sizes: string[]): string =>
  sizes
    .reduce<string[]>((prevSizes, size, index) => {
      const isLast = index === sizes.length - 1;
      const sizeString = isLast ? size : `${BREAKPOINT_QUERIES[index]} ${size}`;
      return [...prevSizes, sizeString];
    }, [])
    .join(', ');
