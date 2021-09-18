import * as React from 'react';
import { NextRouter } from 'next/router';
import styled, { ThemeProvider } from '@xstyled/styled-components';
import Head from 'next/head';
import { Providers } from '../src/providers/AllProviders';
import { Navigation } from '../src/components/Navigation';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
  router: NextRouter;
}

const Main = styled.main`
  background-color: background;
  transition: background-color 0.3s;
`;

const App = (props: AppProps) => {
  const { Component, pageProps: allPageProps, router } = props;
  const path = router.asPath;
  const { shopData, ...pageProps } = allPageProps;

  return (
    <Providers shopData={shopData}>
      <Head>
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
        <link rel="icon" href="/static/favicon.png" />
      </Head>
      <Main>
        <Navigation />
        <Component {...pageProps} />
      </Main>
    </Providers>
  );
};

export default App;
