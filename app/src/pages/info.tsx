import * as React from 'react';
import { GetStaticProps } from 'next';
import { InfoPageView } from '../views/InfoPageView';
import { sanityClient } from '../services';
import { InfoPage as InfoPageType, SiteSettings } from '../types';
import { siteSettingsQuery } from 'src/groq';
import { definitely } from 'src/utils';
import { SEO } from 'src/components/SEO';

interface InfoPageProps {
  infoPage: InfoPageType;
  siteSettings: SiteSettings;
}

const InfoPage: React.FC<InfoPageProps> = ({ siteSettings, infoPage }) => {
  const mergedSeo = {
    ...siteSettings?.seo,
    title: definitely(['Info', siteSettings?.seo?.title]).join(' | '),
    ...infoPage?.seo,
  };
  return (
    <>
      <SEO seo={mergedSeo} />
      <InfoPageView infoPage={infoPage} />;
    </>
  );
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
