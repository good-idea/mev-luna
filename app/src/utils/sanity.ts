import imageUrlBuilder from '@sanity/image-url';
import { config } from '../config';
import { ExpandAllReferences, RichImage } from '../types';

interface Config {
  omitStyles?: string[];
}

/**
 * NOTE: This function is somewhat simple and does not extract text
 * from nested article content, such as callouts and split columns.
 */
export function blocksToPlainText(
  blocks: Sanity.Schema.RichText | ExpandAllReferences<Sanity.Schema.RichText>,
  config: Config = {},
): string {
  const stylesToOmit = config.omitStyles || [];
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' && !block.children) {
          return '';
        }
        /* check to see if we should omit this block based on its style */
        if (stylesToOmit.includes(block.style)) return '';

        // loop through the children spans, and join the
        // text strings
        // @ts-ignore
        return block.children.map((child) => child.text).join('');
      })
      // Remove empty line breaks
      .filter((text) => text.length > 1)
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  );
}

/**
 * Images
 */

const { projectId, dataset } = config.sanity;

const builder = imageUrlBuilder({
  projectId,
  dataset,
});

type Image = Omit<Sanity.Image | RichImage, '_type'>;

export const getImageSource = (image: Image) => builder.image(image);

export const getImageUrl = (image?: Image): string | undefined => {
  if (!image) return undefined;
  const source = getImageSource(image);
  return source.url() || undefined;
};
