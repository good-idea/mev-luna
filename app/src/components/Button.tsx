import React, { ComponentPropsWithoutRef } from 'react';
import styled from '@xstyled/styled-components';

const ButtonWrapper = styled.buttonBox`
  height: 100%;
`;
const SHIFT = 2;

const ButtonInner = styled.divBox`
  appearance: none;
  height: calc(100% - ${SHIFT}px);
  border-radius: 4px;
  line-height: 32px;
  padding: 0 2;
  border: 1px solid currentColor;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px black;

  &:active {
    transform: translate(${SHIFT}px, ${SHIFT}px);
    box-shadow: 0px 0px black;
  }
`;

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonWrapper onClick={props.onClick}>
      <ButtonInner>{props.label}</ButtonInner>
    </ButtonWrapper>
  );
};
