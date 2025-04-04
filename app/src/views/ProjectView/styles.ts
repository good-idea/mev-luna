import styled from '@xstyled/styled-components';

export const ProjectColumns = styled.divBox`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  position: relative;
  padding-bottom: 5;

  @media (min-width: 1100px) {
    grid-template-columns: 400px 1fr;
  }
`;

export const ProjectDescription = styled.divBox`
  margin-top: 40px;

  @media (min-width: 1100px) {
    margin-top: 120px;
    padding-top: 120px;
    position: sticky;
    top: 0;
  }
`;
