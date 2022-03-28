import styled from '@xstyled/styled-components';

export const ProjectColumns = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-column-gap: 10px;
  position: relative;
  padding-bottom: 5;
`;

export const ProjectDescription = styled.div`
  margin-top: 120px;
  padding-top: 120px;
  position: sticky;
  top: 0;
`;
