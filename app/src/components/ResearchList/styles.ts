import styled from '@xstyled/styled-components';

export const ResearchListWrapper = styled.ulBox`
  list-style: none;
  padding: 78px 0 0;
`;

export const ResearchListItemWrapper = styled.liBox`
  border-bottom: 1px solid black;
  padding: 3 0;
  display: block;
`;

export const ResearchListItemInner = styled.divBox`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 270px 120px 120px 1fr 1fr 150px;
`;

export const TitleWrapper = styled.spanBox`
  font-size: 4;
`;

export const MaterialsWrapper = styled.spanBox`
  font-size: 4;
`;

export const DateWrapper = styled.spanBox`
  font-size: 4;
`;

export const ProjectsWrapper = styled.divBox``;

export const SummaryWrapper = styled.divBox``;

export const ThumbnailWrapper = styled.divBox``;
