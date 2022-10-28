import styled from '@xstyled/styled-components';

export const CaptionWrapper = styled.div`
  position: fixed;
  z-index: caption;
  padding: 3;
  padding-bottom: 5;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

export const CaptionText = styled.span`
  text-align: center;
  marign: 0 auto;
  font-size: 42px;
  font-weight: 500;
  color: yellow;
  text-stroke: 1.5px black;
  -webkit-text-stroke: 1px black;
  font-family: sans;
`;
