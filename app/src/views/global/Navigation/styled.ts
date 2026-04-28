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
    display: grid;
    grid-template-columns: repeat(6, 140px);
    grid-template-columns: 140px 140px 130px 130px;
  }
  z-index: nav;
`;

interface NavItemWrapperProps {
  $isActive: boolean;
}
export const NavItemWrapper = styled.divBox<NavItemWrapperProps>`
  ${({ $isActive }) => css`
    color: ${$isActive ? 'mauve' : 'inherit'};
    display: inline;

    &:first-child {
      margin-left: 0;
    }
  `}
`;
