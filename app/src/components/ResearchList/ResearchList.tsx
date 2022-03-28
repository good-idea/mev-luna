import * as React from 'react';
import { Research } from '../../types';
import { ResearchListWrapper } from './styles';
import { ResearchListItem } from './ResearchListItem';

interface ResearchListProps {
  researchList: Research[];
}

export const ResearchList: React.FC<ResearchListProps> = ({ researchList }) => {
  return (
    <ResearchListWrapper>
      {researchList.map((research) => (
        <ResearchListItem key={research._id} research={research} />
      ))}
    </ResearchListWrapper>
  );
};
