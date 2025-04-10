import * as React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ProjectView } from '../../views/ProjectView';
import { sanityClient } from '../../services';
import { Project, SiteSettings } from '../../types';
import { projectQuery, siteSettingsQuery } from '../../groq';
import { SEO } from 'src/components/SEO';
import { definitely } from 'src/utils';

interface ProjectProps {
  project: Project;
  siteSettings: SiteSettings;
}

type Params = {
  projectSlug: string;
};

const Project: React.FC<ProjectProps> = ({ siteSettings, project }) => {
  if (!project) {
    return null;
  }
  const mergedSeo = {
    ...siteSettings?.seo,
    title: definitely([project.title, siteSettings?.seo?.title]).join(' | '),
    ...project?.seo,
  };
  return (
    <>
      <SEO seo={mergedSeo} />
      <ProjectView project={project} />
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async ({
  params,
}) => {
  const projectSlug = params?.projectSlug;
  if (!projectSlug) {
    throw new Error('No project slug was provided for this route');
  }
  const [siteSettings, project] = await Promise.all([
    sanityClient.fetch<SiteSettings>(siteSettingsQuery),
    sanityClient.fetch<Project | null>(
      `*[_type == "project" && slug.current == $projectSlug]{
      ${projectQuery}
    }[0]`,
      { projectSlug },
    ),
  ]);

  if (!project) {
    throw new Error(`No project with slug "${projectSlug}" was found`);
  }

  return {
    props: {
      siteSettings,
      projectSlug,
      project,
    },
    revalidate: 60 * 10,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const projects = await sanityClient.fetch(
    `*[_type == "project"]{
      slug
    }`,
  );

  const paths = projects.map((p) => ({
    params: { projectSlug: p.slug.current },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Project;
