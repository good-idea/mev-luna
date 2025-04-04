import styled from '@xstyled/styled-components';
import * as mediaQueries from '../../theme/mediaQueries';

export const ProjectLinkSpan = styled.spanBox`
  ${mediaQueries.desktop} {
    opacity: 0;
  }

  color: mauve;
  & + & {
    margin-left: 0.2em;
  }
`;

export const ProjectGlyphWrapper = styled.spanBox`
  white-space: nowrap;
  margin-right: 0.2em;
`;

export const ProjectLinkAnchor = styled.spanBox`
  display: block;
  margin-bottom: 0.3em;

  ${mediaQueries.tablet} {
    margin-bottom: 0em;
    display: inline;
  }

  font-size: 3;
  ${mediaQueries.tablet} {
    font-size: 2;
  }
  ${mediaQueries.desktop} {
    font-size: 1;
  }

  margin-right: 0.2em;

  &.hover ${ProjectLinkSpan}, &:hover ${ProjectLinkSpan} {
    opacity: 1;
    color: mauve;
  }

  svg {
    vertical-align: text-bottom;
    height: 1em;
    fill: currentColor;
  }
`;
