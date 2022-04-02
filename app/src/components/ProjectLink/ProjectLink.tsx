import * as React from 'react';
import Link from 'next/link';
import { ProjectLinkAnchor, ProjectLinkSpan } from './styles';
import { Project } from '../../types';
import { Strong } from '../Text';

interface ProjectLinkProps {
  project: Project;
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ project }) => {
  const slug = project.slug.current;
  if (!slug) {
    return null;
  }
  const href = ['projects', slug].join('/');
  return (
    <Link href={href} passHref>
      <ProjectLinkAnchor>
        <ProjectLinkSpan>†</ProjectLinkSpan>
        <ProjectLinkSpan>
          <Strong>{project.title}</Strong>
        </ProjectLinkSpan>
      </ProjectLinkAnchor>
    </Link>
  );
};
