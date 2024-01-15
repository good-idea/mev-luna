import styled from '@xstyled/styled-components';

export const ProjectLinkSpan = styled.spanBox`
  opacity: 0;
  & + & {
    opacity: 0;
    margin-left: 0.2em;
  }
`;

export const ProjectGlyphWrapper = styled.spanBox`
  white-space: nowrap;
  margin-right: 0.2em;
`;

export const ProjectLinkAnchor = styled.spanBox`
  font-size: 1;

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
