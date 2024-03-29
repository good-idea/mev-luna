import styled, { DefaultTheme, css } from '@xstyled/styled-components';

export const HoverImageWrapper = styled.divBox`
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: 0.3s;
  }
`;

export const Wrapper = styled.divBox`
  position: relative;
  text-align: left;
  width: 100%;

  &:hover ${HoverImageWrapper} {
    opacity: 1;
  }
`;

export const Caption = styled.spanBox`
  margin-top: 1;
`;

interface PictureProps {
  theme: DefaultTheme;
  loaded: boolean;
  objectFit?: string;
}

export const Picture = styled.pictureBox`
  ${({ loaded, objectFit }: PictureProps) => css`
    max-height: 100%;
    max-width: 100%;
    width: auto;
    background-color: transparent;
    display: block;

    & > img {
      opacity: ${loaded ? 1 : 0};
      transition: 0.3s;
      transition-delay: 0.3s;
      max-width: 100%;
      object-fit: ${objectFit || 'cover'};
      display: block;
    }
  `}
`;

export const PreloadWrapper = styled.divBox`
  position: fixed;
  top: -500px;
  left: -500px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  z-index: -100;
`;

export const RatioImageFill = styled.divBox`
  display: block;

  & + picture > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
