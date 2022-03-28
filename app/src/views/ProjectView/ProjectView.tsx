import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { Project } from '../../types';
import { RichText } from '../../components/RichText';
import { Gallery } from '../../components/Gallery';
import { ResearchList } from '../../components/ResearchList';
import { definitely } from '../../utils';
import { ProjectColumns, ProjectDescription } from './styles';

interface ProjectViewProps {
  project: Project;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ project }) => {
  const { notes, materials, relatedResearch, title, description, gallery } =
    project;
  return (
    <>
      <ProjectColumns>
        <div>
          <x.h2 mt={0}>{title}</x.h2>
          <ProjectDescription>
            <RichText text={description} />
          </ProjectDescription>
        </div>
        {gallery ? <Gallery gallery={gallery} /> : <div />}
      </ProjectColumns>
      <ProjectColumns>
        <div>
          <RichText text={notes} />
        </div>
        <div>
          <RichText text={materials} />
        </div>
      </ProjectColumns>
      <ResearchList researchList={definitely(relatedResearch)} />
    </>
  );
};
