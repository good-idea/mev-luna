import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { Project } from '../../types';
import { RichText } from '../../components/RichText';
import { Gallery } from '../../components/Gallery';
import { ResearchList } from '../../components/ResearchList';
import { filterMaybes } from '../../utils';
import { ProjectColumns, ProjectDescription } from './styles';

interface ProjectViewProps {
  project: Project;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ project }) => {
  const {
    notes,
    materials,
    relatedResearch,
    title,
    description,
    gallery,
    year,
  } = project;
  const research = filterMaybes(relatedResearch);
  return (
    <>
      <ProjectColumns>
        <div>
          <x.h2 mt={0}>{title}</x.h2>
          <ProjectDescription>
            <RichText text={description} />
            <x.div mt={8}>
              <x.p my={0}>{year}</x.p>
              <RichText text={materials} />
            </x.div>
            <x.div mt={4}>
              <RichText text={notes} />
            </x.div>
          </ProjectDescription>
        </div>
        {gallery ? <Gallery gallery={gallery} /> : <div />}
      </ProjectColumns>
      {research.length ? (
        <>
          <x.hr border="none" borderBottom="1px solid black" m={0} />
          <ResearchList research={filterMaybes(relatedResearch)} />
        </>
      ) : null}
    </>
  );
};
