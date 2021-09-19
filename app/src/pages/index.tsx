import * as React from 'react';
import { GetStaticProps } from 'next';
import { sanityClient } from '../services';
import { siteSettingsQuery } from '../groq';
import { Homepage, SiteSettings } from '../types';
import { HomeView } from '../views';

interface HomePageProps {
  homepage: Homepage;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  return <HomeView homepage={props.homepage} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const [siteSettings, homepage] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    sanityClient.fetch<Homepage>(`*[_id == 'homepage'][0]`),
  ]);

  return {
    props: {
      siteSettings,
      homepage,
    },
  };
};

export default HomePage;
