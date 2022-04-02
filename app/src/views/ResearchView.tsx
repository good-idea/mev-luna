import * as React from 'react';
import { Research } from '../types';
import { ResearchList } from '../components';

interface ResearchViewProps {
  research: Research[];
}

export const ResearchView: React.FC<ResearchViewProps> = ({ research }) => {
  return <ResearchList research={research} />;
};
