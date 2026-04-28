import React, { FC } from 'react';
import styled from '@xstyled/styled-components';
import {
  ResearchListItemInner,
  ResearchListItemWrapper,
  TitleWrapper,
} from './styles';
import * as mediaQueries from '../../theme/mediaQueries';
import { Strong } from '../Text';

const Wrapper = styled.divBox`
  display: none;
  ${mediaQueries.desktop} {
    display: block;
    position: sticky;
    top: 0px;
    padding-top: 50px;
    z-index: 20;
  }
`;

export const ResearchListHeader: FC = () => {
  return (
    <Wrapper>
      <ResearchListItemWrapper>
        <ResearchListItemInner>
          <TitleWrapper>
            <Strong>(Research)</Strong>
          </TitleWrapper>
          <TitleWrapper color="grays.6">Materials</TitleWrapper>
          <TitleWrapper color="grays.6">Year</TitleWrapper>
          <TitleWrapper color="grays.6">Project(s)</TitleWrapper>
        </ResearchListItemInner>
      </ResearchListItemWrapper>
    </Wrapper>
  );
};
