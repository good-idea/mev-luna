import * as React from 'react';
import styled from '@xstyled/styled-components';
import { Image, ImageProps } from './Image';
import { useLockScroll } from '../hooks';
import { getSpacingValue } from 'src/theme';

interface ImageWithLightboxProps {
  imageProps: ImageProps;
}

const ImageButton = styled.buttonBox`
  appearance: none;
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: block;
  font: inherit;
  padding: 0;
  text-align: inherit;
  width: 100%;
`;

const Lightbox = styled.divBox`
  align-items: center;
  background: rgba(255, 255, 255, 1);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 7 4;
  position: fixed;
  z-index: 1000;
`;

const CloseButton = styled.buttonBox`
  appearance: none;
  background: transparent;
  border: 0;
  color: currentColor;
  cursor: pointer;
  width: 18px;
  height: 18px;
  position: absolute;
  right: ${getSpacingValue(4)};
  top: ${getSpacingValue(3)};
  z-index: 1001;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    width: 100%;
    height: 1px;
    background-color: black;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const LightboxImageWrapper = styled.divBox`
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  height: 100%;

  > div {
    width: 100%;
    height: 100%;
  }

  picture,
  picture > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({
  imageProps,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { lockScroll, unlockScroll } = useLockScroll();

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    if (!isOpen) {
      unlockScroll();
      return;
    }

    lockScroll();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [closeLightbox, isOpen, lockScroll, unlockScroll]);

  return (
    <>
      <ImageButton type="button" onClick={openLightbox}>
        <Image {...imageProps} />
      </ImageButton>

      {isOpen ? (
        <Lightbox role="dialog" aria-modal="true">
          <CloseButton
            type="button"
            aria-label="Close image lightbox"
            onClick={closeLightbox}
          />
          <LightboxImageWrapper>
            <Image {...imageProps} sizes={['100vw']} objectFit="contain" />
          </LightboxImageWrapper>
        </Lightbox>
      ) : null}
    </>
  );
};
