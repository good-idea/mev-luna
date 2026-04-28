import styled from '@xstyled/styled-components';
import { Status } from './types';
import * as mediaQueries from '../../theme/mediaQueries';

type FormProps = {
  $status: Status;
};

const HEIGHT = '32px';

export const MessageWrapper = styled.divBox`
  height: ${HEIGHT};
  line-height: ${HEIGHT};
`;

export const Form = styled.formBox<FormProps>`
  display: flex;
  flex-direction: column;
  column-gap: 12px;
  row-gap: 8px;
  align-items: flex-start;
  width: 100%;

  ${mediaQueries.tablet} {
    height: ${HEIGHT};
    flex-direction: row;
    max-width: 300px;
  }

  ${(props: FormProps) =>
    props.$status === 'fetching'
      ? `
    opacity: 0.8;
    pointer-events: none;
    `
      : ``}
`;

export const Input = styled.inputBox`
  appearance: none;
  min-width: 0;
  height: 100%;
  flex: 1;
  line-height: ${HEIGHT};
  padding: 0 2;
  border: 1px solid currentColor;
`;
