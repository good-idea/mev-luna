import styled from '@xstyled/styled-components';

export const Main = styled.mainBox`
  padding: 120px 4 40px;
  width: 100%;

  @media (min-width: 1100px) {
    padding: 120px 4;
  }
`;

export const Divider = styled.hrBox`
  width: calc(100% + 18px * 2);
  margin: 42px -18px 90px -18px;
  border-bottom-width: 0;
`;
