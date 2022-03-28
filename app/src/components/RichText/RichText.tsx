import * as React from 'react';
import { PortableText } from '@portabletext/react';
import { RichText as RichTextType } from '../../types';
import { RichTextWrapper } from './styles';

interface RichTextProps {
  text?: RichTextType;
}

export const RichText: React.FC<RichTextProps> = ({ text }) => {
  if (!text || !text.length) return null;
  return (
    <RichTextWrapper>
      <PortableText value={text} />
    </RichTextWrapper>
  );
};
