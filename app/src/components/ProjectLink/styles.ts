import styled from '@xstyled/styled-components';

export const ProjectLinkSpan = styled.span`
  & + & {
    opacity: 0;
    margin-left: 0.2em;
  }
`;

export const ProjectLinkAnchor = styled.a`
  font-size: 1;

  margin-right: 0.2em;

  &.hover ${ProjectLinkSpan}, &:hover ${ProjectLinkSpan} {
    opacity: 1;
  }
`;
