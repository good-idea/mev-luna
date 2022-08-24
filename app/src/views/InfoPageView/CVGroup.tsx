import * as React from 'react';
import { CVGroup as CVGroupType, CVItem } from '../../types';
import { BodyHeading, Ul, Li } from '../../components/Text';
import { definitely } from '../../utils';

interface EntriesGroupedByYear {
  year: string;
  entries: Sanity.Keyed<CVItem>[];
}

const groupEntriesByYear = (
  entries: Sanity.Keyed<CVItem>[],
): EntriesGroupedByYear[] => {
  const record = entries.reduce<Record<number, Sanity.Keyed<CVItem>[]>>(
    (prevYears, entry) => {
      const year = entry.yearStart;
      const prevOfYear = prevYears[year] || [];
      return {
        ...prevYears,
        [year]: [...prevOfYear, entry],
      };
    },
    {},
  );
  return Object.entries(record).map(([year, entries]) => ({
    year,
    entries,
  }));
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
    <div>
      <BodyHeading>({title})</BodyHeading>
      {options?.groupByYear ? (
        <div>
          {groupEntriesByYear(entries).map(({ year, entries }) => (
            <React.Fragment key={year}>
              <BodyHeading as="h3">{year}</BodyHeading>
              <Ul>
                {entries.map((entry) => (
                  <Li key={entry._key}>{entry.text}</Li>
                ))}
              </Ul>
            </React.Fragment>
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
    </div>
  );
};
