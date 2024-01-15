import * as React from 'react';
import styled, { css, x } from '@xstyled/styled-components';
import { BodyHeading } from './Text';

interface ArrowIconSpanProps {
  isOpen: boolean;
}

const ArrowIconSpan = styled.spanBox<ArrowIconSpanProps>`
  ${({ isOpen }) => css`
    display: inline-block;
    transform: ${isOpen
      ? 'scale(0.8)'
      : 'scale(0.8) translateY(0.1em) rotate(180deg)'};
  `}
`;

interface AccordionProps {
  children: React.ReactNode;
  label: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, label }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleOpen = () => setIsOpen((current) => !current);
  return (
    <div>
      <BodyHeading strong as="button" onClick={toggleOpen}>
        ({label})<ArrowIconSpan isOpen={isOpen}>▲</ArrowIconSpan>
      </BodyHeading>
      {isOpen ? <x.div my={2}>{children}</x.div> : null}
    </div>
  );
};
