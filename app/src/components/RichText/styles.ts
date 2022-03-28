import styled from '@xstyled/styled-components';

export const RichTextWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    &:first-child {
      margin-top: 0;
    }
  }
`;
