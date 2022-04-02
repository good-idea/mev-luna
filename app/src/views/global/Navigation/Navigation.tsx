import * as React from 'react';
import { useRouter } from 'next/router';
import { x } from '@xstyled/styled-components';
import Link from 'next/link';
import { Nav, NavItemWrapper } from './styled';
import { Strong } from '../../../components/Text';

interface NavItemProps {
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, to }) => {
  const { asPath } = useRouter();
  const isActive = to === asPath;
  return (
    <NavItemWrapper isActive={isActive}>
      <Link href={to}>
        <a>
          <x.span fontWeight={2} fontSize={4}>
            <Strong>{label}</Strong>
          </x.span>
        </a>
      </Link>
    </NavItemWrapper>
  );
};

export const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavItem to="/" label="Mev Luna" />
      <NavItem to="/research" label="Research" />
      <NavItem to="/news" label="News" />
      <NavItem to="/info" label="Info" />
    </Nav>
  );
};
