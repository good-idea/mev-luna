import * as React from 'react';
import { GetStaticProps } from 'next';
import { ResearchView } from '../views/ResearchView';
// import { SEO } from '../components/SEO';
import { sanityClient } from '../services';
import { ResearchPage, Research as ResearchType } from '../types';
import { researchLinkFragment } from '../groq';

interface ResearchProps {
  research?: ResearchType[];
  researchPage: ResearchPage;
}

// <SEO seo={researchPage.seo} />
const Research: React.FC<ResearchProps> = ({ research, researchPage }) => (
  <>
    <ResearchView research={research || []} />
  </>
);

export const getStaticProps: GetStaticProps<ResearchProps> = async () => {
  const { research, researchPage } = await sanityClient.fetch<{
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
  );
  return {
    props: {
      research,
      researchPage,
    },
    revalidate: 60 * 10,
  };
};

export default Research;
