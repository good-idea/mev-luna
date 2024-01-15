import * as React from 'react';
import { KeyedArray, CVGroup as CVGroupType, CVItem } from '../../types';
import { BodyHeading, Ul, Li } from '../../components/Text';
import { CVGroupWrapper, CVGroupYear } from './styles';

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
      <BodyHeading>({title})</BodyHeading>
      {options?.groupByYear ? (
        <div>
          {groupEntriesByYear(entries).map(({ year, entries }) => (
            <CVGroupYear key={year}>
              <BodyHeading mb={0} as="h3">
                {year}
              </BodyHeading>
              <Ul m={0}>
                {entries.map((entry) => (
                  <Li key={entry._key}>{entry.text}</Li>
                ))}
              </Ul>
            </CVGroupYear>
          ))}
        </div>
      ) : (
        <Ul>
          {entries.map((entry) => (
            <Li key={entry._key}>
              <span>{getEntryYear(entry)}&nbsp;</span>
              {entry.text}
            </Li>
          ))}
        </Ul>
      )}
    </CVGroupWrapper>
  );
};
