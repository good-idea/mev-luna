import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { x } from '@xstyled/styled-components';
import Link from 'next/link';
import { Nav, NavItemWrapper } from './styled';
import { Strong } from '../../../components/Text';
import { isEnabled } from 'src/config/featureFlags';

interface NavItemProps {
  label: string;
  to: string;
}

const NavItem: FC<NavItemProps> = ({ label, to }) => {
  const { asPath } = useRouter();
  const isActive = to === asPath;
  return (
    <NavItemWrapper isActive={isActive}>
      <Link href={to}>
        <x.span fontWeight={2} fontSize={4}>
          <Strong>{label}</Strong>
        </x.span>
      </Link>
    </NavItemWrapper>
  );
};

export const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavItem to="/" label="Mev Luna" />
      <NavItem to="/research" label="Research" />
      {isEnabled('newsPage') ? <NavItem to="/news" label="News" /> : null}
      <NavItem to="/info" label="Info" />
    </Nav>
  );
};
