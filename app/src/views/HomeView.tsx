import * as React from 'react';
import { Homepage } from '../types';

interface HomeViewProps {
  homepage: Homepage;
  /* */
}

export const HomeView: React.FC<HomeViewProps> = (props) => {
  console.log(props);
  return <div>...</div>;
};
