import * as React from 'react';
import { GetStaticProps } from 'next';
import { InfoPageView } from '../views/InfoPageView';
import { sanityClient } from '../services';
import { InfoPage as InfoPageType } from '../types';

interface InfoPageProps {
  infoPage: InfoPageType;
}

const InfoPage: React.FC<InfoPageProps> = ({ infoPage }) => {
  return <InfoPageView infoPage={infoPage} />;
};

export const getStaticProps: GetStaticProps<InfoPageProps> = async () => {
  const infoPage = await sanityClient.fetch<InfoPageType>(
    `
     *[_id == "infoPage"][0]
    `,
  );
  return {
    props: { infoPage },
    revalidate: 60 * 10,
  };
};

export default InfoPage;
