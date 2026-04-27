import * as React from 'react';
import { NextRouter } from 'next/router';
import Head from 'next/head';
import { Providers } from '../providers';
import { SEO } from 'src/components/SEO';
import { Main } from 'src/components/Layout';
import { Navigation } from '../views/global';
import { SiteSettings } from 'src/types';

interface AppProps {
  Component: React.ComponentType;
  pageProps: {
    siteSettings?: SiteSettings;
  };
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
      </Head>
      <SEO seo={pageProps?.siteSettings?.seo} />
      <Navigation />
      <Main>
        {/* @ts-expect-error */}
        <Component {...pageProps} />
      </Main>
    </Providers>
  );
};

export default App;
