import * as React from 'react';
import Img from 'next/image';
import { RatioImageFill } from './styled';

interface RatioPaddingProps {
  ratio: number;
  canvasFill?: boolean;
  backgroundColor?: string;
}

export const RatioPadding = ({
  ratio,
  canvasFill,
  backgroundColor: customBGColor,
}: RatioPaddingProps) => {
  const [src, setSrc] = React.useState<string | void>(undefined);

  const backgroundColor = customBGColor || 'transparent';

  React.useEffect(() => {
    if (!canvasFill) return;
    const canvas = window.document.createElement('canvas');
    canvas.setAttribute('width', '1600');
    canvas.setAttribute('height', `${1600 * ratio}`);
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    ctx.beginPath();
    ctx.rect(0, 0, 1600, 1600 * ratio);
    ctx.fillStyle = backgroundColor || 'rgba(220, 220, 220, 0)';
    ctx.fill();
    const srcData = canvas.toDataURL('image/png');
    setSrc(srcData);
  }, [ratio, canvasFill, backgroundColor]);

  const paddingBottom = src ? 0 : `${ratio * 100}%`;
  return (
    <RatioImageFill style={{ paddingBottom, backgroundColor }} aria-hidden>
      {src ? <img src={src} /> : null}
    </RatioImageFill>
  );
};
