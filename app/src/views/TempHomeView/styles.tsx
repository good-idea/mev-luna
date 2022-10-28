import styled from '@xstyled/styled-components';

export const Main = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: #e3e3e3;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  width: calc(100% - 2rem);
  max-width: 550px;
  margin: 3 0;
  padding: 3;
  border: 1px solid black;
  background-color: white;

  a {
    text-decoration: underline;
  }
`;
