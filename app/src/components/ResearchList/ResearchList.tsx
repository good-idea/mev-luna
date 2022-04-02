import * as React from 'react';
import { Research } from '../../types';
import { ResearchListWrapper } from './styles';
import { ResearchListItem } from './ResearchListItem';

interface ResearchListProps {
  research: Research[];
}

export const ResearchList: React.FC<ResearchListProps> = ({ research }) => {
  return (
    <ResearchListWrapper>
      {research.map((item) => (
        <ResearchListItem key={item._id} research={item} />
      ))}
    </ResearchListWrapper>
  );
};
