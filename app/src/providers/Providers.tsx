import * as React from 'react';
import { ThemeProvider } from '@xstyled/styled-components';
import { ResidueProvider } from './ResidueProvider';

import { GlobalStyles, theme } from '../theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ResidueProvider>{children}</ResidueProvider>
  </ThemeProvider>
);
