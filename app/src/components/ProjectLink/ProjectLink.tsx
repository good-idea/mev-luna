import * as React from 'react';
import Link from 'next/link';
import { useResidue } from '../../providers/ResidueProvider';
import { ProjectLinkAnchor, ProjectLinkSpan } from './styles';
import { Project } from '../../types';
import { Strong } from '../Text';

interface ProjectLinkProps {
  project: Project;
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ project }) => {
  const { addLayer } = useResidue();
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef<HTMLAnchorElement>(null);
  const slug = project.slug.current;
  if (!slug) {
    return null;
  }
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  React.useEffect(() => {
    if (!isHovered) return;
    if (!ref.current) return;
  }, [isHovered]);
  const handleClick = () => {
    if (!ref.current) return;
    addLayer(ref.current);
  };
  const href = ['projects', slug].join('/');
  return (
    <Link href={href} passHref>
      <ProjectLinkAnchor
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <ProjectLinkSpan>†</ProjectLinkSpan>
        <ProjectLinkSpan>
          <Strong>{project.title}</Strong>
        </ProjectLinkSpan>
      </ProjectLinkAnchor>
    </Link>
  );
};
