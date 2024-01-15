import styled, { x, css } from '@xstyled/styled-components';

interface SharedTextProps {
  strong?: boolean;
}

// @ts-ignore
export const BodyHeading = styled(x.h2)<SharedTextProps>`
  ${({ strong }) => css`
    font-size: 4;
    font-weight: ${strong ? '3' : '1'};
    margin-top: 0;
  `}
`;

// @ts-ignore
export const Ul = styled(x.ul)`
  padding: 0;
`;

export const Li = styled.liBox<SharedTextProps>`
  ${({ strong }) => css`
    list-style-type: none;
    font-size: 4;
    font-weight: ${strong ? '3' : '1'};
    margin: 0;
    padding: 0;
  `}
`;

export const Strong = styled.spanBox`
  -webkit-text-stroke: 0.03em;
`;
