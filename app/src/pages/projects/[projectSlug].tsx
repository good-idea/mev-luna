import * as React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ProjectView } from '../../views/ProjectView';
import { sanityClient } from '../../services';
import { Project } from '../../types';
import { projectQuery } from '../../groq';

interface ProjectProps {
  project: Project;
}

type Params = {
  projectSlug: string;
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  if (!project) {
    return null;
  }
  return <ProjectView project={project} />;
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async ({
  params,
}) => {
  const projectSlug = params?.projectSlug;
  if (!projectSlug) {
    throw new Error('No project slug was provided for this route');
  }
  const project = await sanityClient.fetch<Project | null>(
    `*[_type == "project" && slug.current == $projectSlug]{
      ${projectQuery}
    }[0]`,
    { projectSlug },
  );

  if (!project) {
    throw new Error(`No project with slug "${projectSlug}" was found`);
  }

  return {
    props: {
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
