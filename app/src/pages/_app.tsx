import * as React from 'react';
import { NextRouter } from 'next/router';
import Head from 'next/head';
import { Providers } from '../providers';
import { SEO } from 'src/components/SEO';
import { Main } from 'src/components/Layout';
import { Navigation } from '../views/global';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
  router: NextRouter;
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <Providers>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
        <link rel="icon" href="/static/favicon.png" />
      </Head>
      <SEO seo={pageProps?.siteSettings?.seo} />
      <>
        <Navigation />
        <Main>
          <Component {...pageProps} />
        </Main>
      </>
    </Providers>
  );
};

export default App;
