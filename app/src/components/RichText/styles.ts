import styled from '@xstyled/styled-components';

export const RichTextWrapper = styled.divBox`
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

  a {
    font-weight: 3;
    cursor: pointer;
  }
`;
