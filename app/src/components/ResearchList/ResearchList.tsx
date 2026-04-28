import * as React from 'react';
import { Research } from '../../types';
import { ResearchListUL, ResearchListWrapper } from './styles';
import { ResearchListItem } from './ResearchListItem';
import { ResearchListHeader } from './ResearchListHeader';

interface ResearchListProps {
  research: Research[];
}

export const ResearchList: React.FC<ResearchListProps> = ({ research }) => {
  return (
    <ResearchListWrapper>
      <ResearchListHeader />
      <ResearchListUL>
        {research.map((item) => (
          <ResearchListItem key={item._id} research={item} />
        ))}
      </ResearchListUL>
    </ResearchListWrapper>
  );
};
