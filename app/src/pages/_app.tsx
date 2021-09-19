import * as React from 'react';
import { NextRouter } from 'next/router';
import styled from '@xstyled/styled-components';
import Head from 'next/head';
import { Providers } from '../providers';
import { Navigation } from '../components/Navigation';

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
  const { Component, pageProps: allPageProps } = props;
  const { siteSettings, ...pageProps } = allPageProps;

  return (
    <Providers>
      <Head>
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
        <link rel="icon" href="/static/favicon.png" />
      </Head>
      <Main>
        <Navigation projects={siteSettings.projects} />
        <Component {...pageProps} />
      </Main>
    </Providers>
  );
};

export default App;
