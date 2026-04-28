import * as React from 'react';

import { x } from '@xstyled/styled-components';
import { KeyedArray, CVGroup as CVGroupType, CVItem } from '../../types';
import { RichText } from '../../components/RichText';
import { BodyHeading, Ul, Li } from '../../components/Text';
import {
  CVGroupTitle,
  CVGroupWrapper,
  CVGroupYear,
  ListWrapper,
  UnGroupedList,
  UnGroupedListItem,
} from './styles';

interface EntriesGroupedByYear {
  year: string;
  entries: KeyedArray<CVItem>;
}

const groupEntriesByYear = (
  entries: KeyedArray<CVItem>,
): EntriesGroupedByYear[] => {
  const record = entries.reduce<Record<number, KeyedArray<CVItem>>>(
    (prevYears, entry) => {
      const year = entry.yearStart;
      const prevEntries = prevYears[year] || [];
      return {
        ...prevYears,
        [year]: [entry, ...prevEntries],
      };
    },
    {},
  );
  return Object.entries(record)
    .map(([year, entries]) => ({
      year,
      entries,
    }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));
};

const getEntryYear = ({ yearStart, yearEnd }: CVItem): string =>
  yearEnd ? [yearStart, yearEnd].join('-') : yearStart.toString();

interface CVGroupProps {
  group: CVGroupType;
}

export const CVGroup: React.FC<CVGroupProps> = ({ group }) => {
  const { title, options, entries } = group;

  if (!entries) return null;
  return (
    <CVGroupWrapper>
      <CVGroupTitle>({title})</CVGroupTitle>
      <ListWrapper>
        {options?.groupByYear ? (
          <div>
            {groupEntriesByYear(entries).map(({ year, entries }) => (
              <CVGroupYear key={year}>
                <BodyHeading mb={0} as="h3">
                  {year}
                </BodyHeading>
                <ListWrapper>
                  <Ul m={0}>
                    {entries.map((entry) => (
                      <Li key={entry._key}>
                        <RichText inline text={entry.title} />
                      </Li>
                    ))}
                  </Ul>
                </ListWrapper>
              </CVGroupYear>
            ))}
          </div>
        ) : (
          <UnGroupedList>
            {entries.map((entry) => (
              <UnGroupedListItem key={entry._key}>
                <x.span mr={2}>{getEntryYear(entry)}&nbsp;</x.span>
                <RichText inline text={entry.title} />
              </UnGroupedListItem>
            ))}
          </UnGroupedList>
        )}
      </ListWrapper>
    </CVGroupWrapper>
  );
};
