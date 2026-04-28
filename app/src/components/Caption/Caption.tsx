import * as React from 'react';
import { useResidue } from '../../providers/ResidueProvider';
import { CaptionWrapper, CaptionText } from './styled';

const { useEffect, useRef } = React;

interface CaptionProps {
  text?: string;
}

export const Caption: React.FC<CaptionProps> = ({ text }) => {
  const { captureElementTrace, eventIsEnabled } = useResidue();
  const ref = useRef<HTMLAnchorElement>(null);
  const isEnabled = eventIsEnabled('subtitles');

  useEffect(() => {
    if (text && isEnabled && ref.current) captureElementTrace(ref.current);
  }, [captureElementTrace, isEnabled, text]);

  if (!text) return null;

  return (
    <CaptionWrapper>
      <CaptionText ref={ref}>{text}</CaptionText>
    </CaptionWrapper>
  );
};
