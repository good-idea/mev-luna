import React, { useEffect, useState, ComponentPropsWithoutRef } from 'react';
import styled from '@xstyled/styled-components';

const ButtonWrapper = styled.buttonBox`
  height: 100%;
`;
const SHIFT = 2;

interface StyledProps {
  $isLoading?: boolean;
}

const ButtonInner = styled.divBox<StyledProps>`
  position: relative;
  appearance: none;
  background-color: white;
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

const ButtonLabel = styled.spanBox<StyledProps>`
  ${(props: StyledProps) =>
    props.$isLoading
      ? `
    opacity: 0;

    `
      : ``}
`;

const ButtonSpinnerWrapper = styled.divBox`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ButtonSpinnerProps {
  isLoading: boolean;
}

const INTERVAL = 700;

const CHARS = {
  0: '◐',
  1: '◓',
  2: '◑',
  3: '◒',
};

const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ isLoading }) => {
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingStep((step) => (step + 1) % 4);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [isLoading]);

  const loadingChar = CHARS[loadingStep];

  if (!isLoading) return null;
  return <ButtonSpinnerWrapper>{loadingChar}</ButtonSpinnerWrapper>;
};

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonWrapper onClick={props.onClick}>
      <ButtonInner>
        <ButtonLabel $isLoading={props.isLoading}>{props.label}</ButtonLabel>
        <ButtonSpinner isLoading={Boolean(props.isLoading)} />
      </ButtonInner>
    </ButtonWrapper>
  );
};
