import * as React from 'react';
import { GetStaticProps } from 'next';
import { InfoPageView } from '../views/InfoPageView';
import { sanityClient } from '../services';
import { InfoPage as InfoPageType, SiteSettings } from '../types';
import { siteSettingsQuery } from 'src/groq';

interface InfoPageProps {
  infoPage: InfoPageType;
}

const InfoPage: React.FC<InfoPageProps> = ({ infoPage }) => {
  return <InfoPageView infoPage={infoPage} />;
};

export const getStaticProps: GetStaticProps<InfoPageProps> = async () => {
  const [siteSettings, infoPage] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    await sanityClient.fetch<InfoPageType>(
      `
     *[_id == "infoPage"][0]
    `,
    ),
  ]);
  return {
    props: { infoPage, siteSettings },
    revalidate: 60 * 10,
  };
};

export default InfoPage;
