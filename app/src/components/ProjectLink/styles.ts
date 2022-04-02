import styled, { css } from '@xstyled/styled-components';

interface LinkSpanProps {
  strong?: boolean;
}

export const ProjectLinkSpan = styled.span<LinkSpanProps>`
  ${({ strong }) => css`
    -webkit-text-stroke: ${strong ? '0.03em' : '0'};
    & + & {
      opacity: 0;
      margin-left: 0.2em;
    }
  `}
`;

export const ProjectLinkAnchor = styled.a`
  font-size: 1;

  & + & {
    margin-left: 0.2em;
  }

  &:hover ${ProjectLinkSpan} {
    opacity: 1;
  }
`;
