import styled from '@xstyled/styled-components';
import * as mediaQueries from '../../theme/mediaQueries';

export const InfoBodyWrapper = styled.divBox`
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: 1fr;

  ${mediaQueries.tablet} {
    grid-template-columns: 375px 375px;
  }
`;

export const CVWrapper = styled.divBox`
  column-count: 1;
  ${mediaQueries.tablet} {
    column-count: 3;
  }
`;

export const CVGroupWrapper = styled.divBox`
  padding-top: 3;
  break-inside: avoid;
`;

export const CVGroupYear = styled.divBox`
  margin-bottom: 3;
`;
