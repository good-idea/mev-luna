import * as React from 'react';
import { useResidue } from '../../providers/ResidueProvider';
import { CaptionWrapper, CaptionText } from './styled';

const { useEffect, useRef } = React;

interface CaptionProps {
  text?: string;
}

export const Caption: React.FC<CaptionProps> = ({ text }) => {
  const { addLayer, eventIsEnabled } = useResidue();
  const ref = useRef<HTMLAnchorElement>(null);
  const isEnabled = eventIsEnabled('subtitles');
  if (!text) return null;
  useEffect(() => {
    if (isEnabled && ref.current) addLayer(ref.current);
  }, [isEnabled]);
  return (
    <CaptionWrapper>
      <CaptionText ref={ref}>{text}</CaptionText>
    </CaptionWrapper>
  );
};
