import styled, { css } from '@xstyled/styled-components';
import { DisplayMode } from './types';

interface CanvasContainerProps {
  $displayMode: DisplayMode;
}

export const CanvasContainer = styled.divBox<CanvasContainerProps>`
  ${({ $displayMode }) => css`
    position: fixed;
    z-index: -1;
    opacity: ${$displayMode !== 'hidden' ? 1 : 0};
    pointer-events: none;
    transform-origin: 100% 100%;
    outline: 1px solid blue;
    width: 200%;
    height: 200%;

    ${$displayMode === 'mini'
      ? `
      bottom: 18;
      right: 18;
      border: 3px solid gray;
      transform: scale(0.1);
    `
      : $displayMode === 'overlay'
        ? `
      top: 20px;
      left: 20px;
      width: calc(100vw - 40px);
      height: calc(100vh - 40px);
      background-color: white;
      border: 1px solid black;
      `
        : $displayMode === 'background'
          ? `
      z-index: -1;
      bottom: 0;
      right: 0;
      transform: scale(0.5);
    `
          : 'display: none'}
  `}
`;

interface CanvasLayerImageProps {
  $index: number;
  $left?: number;
  $top?: number;
  $blur?: boolean;
}

export const CanvasLayerImage = styled.imgBox<CanvasLayerImageProps>`
  ${({ $left = 0, $top = 0, $blur = false }) => css`
    position: absolute;
    top: ${$top}px;
    left: ${$left}px;
    filter: ${$blur ? 'blur(50px)' : 'none'};
    transition: 2s;
  `}
`;
