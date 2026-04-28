import * as React from 'react';
import { PortableText } from '@portabletext/react';
import { RichText as RichTextType } from '../../types';
import { RichTextWrapper } from './styles';

interface RichTextProps {
  text?: RichTextType;
  inline?: boolean;
}

const inlineComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  },
};

export const RichText: React.FC<RichTextProps> = ({ text, inline = false }) => {
  if (!text || !text.length) return null;
  return (
    <RichTextWrapper as={inline ? 'span' : 'div'}>
      <PortableText
        value={text}
        components={inline ? inlineComponents : undefined}
      />
    </RichTextWrapper>
  );
};
