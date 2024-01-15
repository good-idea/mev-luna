import styled from '@xstyled/styled-components';

export const ProjectColumns = styled.divBox`
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-column-gap: 30px;
  position: relative;
  padding-bottom: 5;
`;

export const ProjectDescription = styled.divBox`
  margin-top: 120px;
  padding-top: 120px;
  position: sticky;
  top: 0;
`;
