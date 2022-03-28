import * as React from 'react';
import Link from 'next/link';
import { x } from '@xstyled/styled-components';
import { RichText } from '../RichText';
import { Image } from '../Image';
import { Research } from '../../types';
import { definitely, getMediaImages } from '../../utils';
import {
  DateWrapper,
  MaterialsWrapper,
  ProjectsWrapper,
  ResearchListItemInner,
  ResearchListItemWrapper,
  SummaryWrapper,
  ThumbnailWrapper,
  TitleWrapper,
} from './styles';

interface ResearchListItemProps {
  research: Research;
}

export const ResearchListItem: React.FC<ResearchListItemProps> = ({
  research,
}) => {
  const { title, relatedProjects, materials, date, slug, summary, gallery } =
    research;
  const href = slug.current ? `/research/${slug.current}` : null;
  const firstImage = getMediaImages(gallery?.media)[0];
  const allRelatedProjects = definitely(relatedProjects);
  if (!href) return null;
  return (
    <ResearchListItemWrapper>
      <Link href={href}>
        <ResearchListItemInner>
          <TitleWrapper>{title}</TitleWrapper>

          <MaterialsWrapper>
            <RichText text={materials} />
          </MaterialsWrapper>

          <DateWrapper>{date}</DateWrapper>

          <ProjectsWrapper>
            {allRelatedProjects.map((project, index) => (
              <x.span
                key={project._id}
                fontWeight={3}
                fontStyle="italic"
                fontSize={4}
              >
                {project.title}
                {index === allRelatedProjects.length - 1 ? '' : ', '}
              </x.span>
            ))}
          </ProjectsWrapper>

          <SummaryWrapper>
            <RichText text={summary} />
          </SummaryWrapper>

          <ThumbnailWrapper>
            {firstImage ? (
              <Image sizes={['100vw', '110px']} image={firstImage} />
            ) : null}
          </ThumbnailWrapper>
        </ResearchListItemInner>
      </Link>
    </ResearchListItemWrapper>
  );
};
