import styled, { css } from '@xstyled/styled-components';
import * as mediaQueries from '../../../theme/mediaQueries';

export const Nav = styled.navBox`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 3 4 0;
  ${mediaQueries.tablet} {
    padding: 5 5 0;
  }
  z-index: nav;
`;

interface NavItemWrapperProps {
  isActive: boolean;
}
export const NavItemWrapper = styled.divBox<NavItemWrapperProps>`
  ${({ isActive }) => css`
    color: ${isActive ? 'mauve' : 'inherit'};
    display: inline;
    margin-left: 25px;
    ${mediaQueries.tablet} {
      margin-left: 65px;
    }

    &:first-child {
      margin-left: 0;
    }
  `}
`;
