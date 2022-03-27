import * as React from 'react';
import { x } from '@xstyled/styled-components';
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
      {projectMenu.map((project) => (
        <ProjectLink key={project._id} project={project} />
      ))}
    </>
  );
};
