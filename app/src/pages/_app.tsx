import * as React from 'react';
import { NextRouter } from 'next/router';
import Head from 'next/head';
import { Providers } from '../providers';
import { Main } from '../components/Layout';
import { Navigation } from '../views/global';
import { GlobalStyles } from '../theme';
import { ThemeProvider } from '@xstyled/styled-components';
import { defaultTheme } from '../theme/defaultTheme';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
  router: NextRouter;
}

const App = (props: AppProps) => {
  const { Component, pageProps: allPageProps } = props;
  const { siteSettings, ...pageProps } = allPageProps;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
        <link rel="icon" href="/static/favicon.png" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
