import styled, { css } from '@xstyled/styled-components';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5 5 0;
  z-index: nav;
`;

interface NavItemWrapperProps {
  isActive: boolean;
}
export const NavItemWrapper = styled.div<NavItemWrapperProps>`
  ${({ isActive }) => css`
    color: ${isActive ? 'mauve' : 'inherit'};
    display: inline;
    margin-left: 65px;

    &:first-child {
      margin-left: 0;
    }
  `}
`;
