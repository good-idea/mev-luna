import * as React from 'react';
import { Homepage } from '../types';
import { definitely } from '../utils';
import { ProjectLink } from '../components';

interface HomeViewProps {
  homepage: Homepage;
}

export const HomeView: React.FC<HomeViewProps> = ({ homepage }) => {
  const projectMenu = definitely(homepage?.projectMenu);
  return (
    <>
      {projectMenu.map((project, index) => (
        <ProjectLink key={project._id} project={project} index={index} />
      ))}
    </>
  );
};
