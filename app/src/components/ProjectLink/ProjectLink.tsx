import * as React from 'react';
import Link from 'next/link';
import {
  ProjectGlyphWrapper,
  ProjectLinkAnchor,
  ProjectLinkSpan,
} from './styles';
import { Project } from '../../types';
import { Strong } from '../Text';
import { ProjectLinkGlyph } from './ProjectLinkGlyph';
import { useResidue } from 'src/providers/ResidueProvider';

interface ProjectLinkProps {
  project: Project;
  index: number;
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ project, index }) => {
  const { captureElementTrace, eventIsEnabled } = useResidue();
  const [isHovered, setIsHovered] = React.useState(true);
  const ref = React.useRef<HTMLAnchorElement>(null);
  const slug = project.slug.current;
  if (!slug) {
    return null;
  }
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClick = () => {
    if (!ref.current) return;
    /* BUG: Glyph is captured as dark */
    if (eventIsEnabled('linkClick')) captureElementTrace(ref.current);
  };
  React.useEffect(() => {
    if (!isHovered) return;
    if (!ref.current) return;
  }, [isHovered]);
  const href = ['projects', slug].join('/');
  return (
    <>
      <Link href={href} passHref>
        <ProjectLinkAnchor
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <ProjectGlyphWrapper>
            <ProjectLinkGlyph index={index} />
          </ProjectGlyphWrapper>
          <ProjectLinkSpan>
            <Strong>{project.title}</Strong>
          </ProjectLinkSpan>
        </ProjectLinkAnchor>
      </Link>
    </>
  );
};
