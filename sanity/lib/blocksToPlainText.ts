import { PortableTextBlock } from '@portabletext/types';

type PortableText = PortableTextBlock[] | undefined | null;

export function blocksToPlainText(blocks: PortableText) {
  if (!blocks?.length) return '';

  return blocks
    .map((block) => {
      if (
        block._type !== 'block' ||
        !('children' in block) ||
        !block.children
      ) {
        return '';
      }

      return block.children
        .map((child) =>
          typeof child === 'object' && child !== null && 'text' in child
            ? child.text || ''
            : '',
        )
        .join('');
    })
    .filter(Boolean)
    .join('\n\n');
}
