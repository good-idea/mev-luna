import * as React from 'react';
import { Project } from '../../types';

interface NavigationProps {
  projects: Project[];
}

export const Navigation: React.FC<NavigationProps> = (props) => {
  console.log({ props });
  return <div>...</div>;
};
