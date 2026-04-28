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

export const UnGroupedList = styled.ulBox`
  display: flex;
  flex-direction: column;
  row-gap: 2;
  padding: 0;
`;

export const UnGroupedListItem = styled.liBox`
  display: grid;
  grid-template-columns: 45px 1fr;
`;

export const CVGroupTitle = styled.h2Box`
  font-size: 4;
  margin-top: 0;
  font-weight: 600;
`;

export const CVWrapper = styled.divBox`
  column-count: 1;
  ${mediaQueries.tablet} {
    column-count: 3;
  }
`;

export const ListWrapper = styled.divBox`
  ${mediaQueries.tablet} {
    margin-left: 3;
  }
`;

export const CVGroupWrapper = styled.divBox`
  padding-top: 3;
  break-inside: avoid;
`;

export const CVGroupYear = styled.divBox`
  margin-bottom: 3;
`;
