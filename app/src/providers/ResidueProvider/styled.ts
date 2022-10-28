import styled, { css } from '@xstyled/styled-components';
import { DisplayMode } from './types';

interface CanvasContainerProps {
  displayMode: DisplayMode;
}

export const CanvasContainer = styled.div<CanvasContainerProps>`
  ${({ displayMode }) => css`
    position: fixed;
    z-index: 200;
    opacity: ${displayMode !== 'hidden' ? 1 : 0};
    pointer-events: none;
    transform-origin: 100% 100%;
    outline: 1px solid blue;
    width: 200%;
    height: 200%;

    ${displayMode === 'hidden'
      ? `
      display: none;
      `
      : displayMode === 'mini'
      ? `
      bottom: 18;
      right: 18;
      border: 3px solid gray;
      transform: scale(0.1);
    `
      : `
      z-index: -1;
      bottom: 0;
      right: 0;
      transform: scale(0.5);
    `}
  `}
`;

interface CanvasLayerImageProps {
  index: number;
}

export const CanvasLayerImage = styled.img<CanvasLayerImageProps>`
  ${({ index }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${0.5 - index / 10};
    filter: blur(2px);
    transition: 2s;
  `}
`;
