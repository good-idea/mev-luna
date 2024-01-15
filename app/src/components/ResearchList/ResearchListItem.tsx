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
import { useResidue } from 'src/providers/ResidueProvider';

interface ResearchListItemProps {
  research: Research;
}

export const ResearchListItem: React.FC<ResearchListItemProps> = ({
  research,
}) => {
  const { captureElementTrace, eventIsEnabled } = useResidue();
  const ref = React.useRef<HTMLAnchorElement>(null);
  const { title, relatedProjects, materials, date, slug, summary, gallery } =
    research;
  const href = slug.current ? `/research/${slug.current}` : null;
  const firstImage = getMediaImages(gallery?.media)[0];
  const allRelatedProjects = definitely(relatedProjects);
  const handleClick = () => {
    if (!ref.current) return;
    if (eventIsEnabled('linkClick')) captureElementTrace(ref.current);
  };

  if (!href) return null;
  return (
    <ResearchListItemWrapper>
      <ResearchListItemInner>
        <TitleWrapper>{title}</TitleWrapper>

        <MaterialsWrapper>
          <RichText text={materials} />
        </MaterialsWrapper>

        <DateWrapper>{date}</DateWrapper>

        <ProjectsWrapper>
          {allRelatedProjects.map((project, index) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              passHref
            >
              <x.span
                ref={ref}
                fontWeight={3}
                fontStyle="italic"
                onClick={handleClick}
                fontSize={4}
              >
                {project.title}
                {index === allRelatedProjects.length - 1 ? '' : ', '}
              </x.span>
            </Link>
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
    </ResearchListItemWrapper>
  );
};
