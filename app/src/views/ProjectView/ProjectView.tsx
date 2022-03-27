import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { Project } from '../../types';
import { RichText } from '../../components/RichText';
import { Gallery } from '../../components/Gallery';
import { ProjectColumns, ProjectDescription } from './styles';

interface ProjectViewProps {
  project: Project;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ project }) => {
  const { title, description, gallery } = project;
  return (
    <>
      <ProjectColumns>
        <div>
          <x.h2 mt={0}>{title}</x.h2>
          <ProjectDescription>
            <RichText text={description} />
          </ProjectDescription>
        </div>
        {gallery ? <Gallery gallery={gallery} /> : null}
      </ProjectColumns>
    </>
  );
};
