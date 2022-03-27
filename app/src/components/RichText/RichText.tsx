import * as React from 'react';
import { PortableText } from '@portabletext/react';
import { RichText as RichTextType } from '../../types';

interface RichTextProps {
  text?: RichTextType;
}

export const RichText: React.FC<RichTextProps> = ({ text }) => {
  if (!text || !text.length) return null;
  return <PortableText value={text} />;
};
