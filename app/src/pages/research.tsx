import * as React from 'react';
import { GetStaticProps } from 'next';
import { ResearchView } from '../views/ResearchView';
import { SEO } from 'src/components/SEO';
import { sanityClient } from '../services';
import { ResearchPage, Research as ResearchType, SiteSettings } from '../types';
import { researchLinkFragment, siteSettingsQuery } from '../groq';
import { definitely } from 'src/utils';

interface ResearchProps {
  research?: ResearchType[];
  researchPage: ResearchPage;
  siteSettings: SiteSettings;
}

const Research: React.FC<ResearchProps> = ({
  siteSettings,
  research,
  researchPage,
}) => {
  const mergedSeo = {
    ...siteSettings?.seo,
    title: definitely(['Research', siteSettings?.seo?.title]).join(' | '),
    ...researchPage?.seo,
  };

  return (
    <>
      <SEO seo={mergedSeo} />
      <ResearchView researchPage={researchPage} research={research || []} />
    </>
  );
};

export const getStaticProps: GetStaticProps<ResearchProps> = async () => {
  const [siteSettings, { research, researchPage }] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    sanityClient.fetch<{
      research: ResearchType[];
      researchPage: ResearchPage;
    }>(
      `{
      "research": *[_type == "research"]{
        ${researchLinkFragment}
      }[],
      "researchPage": *[_type == "researchPage"][0]
    }
    `,
    ),
  ]);

  return {
    props: {
      siteSettings,
      research,
      researchPage,
    },
    revalidate: 60 * 10,
  };
};

export default Research;
