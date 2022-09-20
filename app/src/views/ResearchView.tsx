import * as React from 'react';
import { Research, ResearchPage } from '../types';
import { ResearchList } from '../components';

interface ResearchViewProps {
  research: Research[];
  researchPage: ResearchPage;
}

export const ResearchView: React.FC<ResearchViewProps> = ({ research }) => {
  return <ResearchList research={research} />;
};
