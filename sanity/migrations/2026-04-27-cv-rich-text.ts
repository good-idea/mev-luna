import { at, defineMigration, patch, set } from 'sanity/migrate';

type PortableTextBlock = {
  _key: string;
  _type: 'block';
  children: Array<{
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
  }>;
  markDefs: [];
  style: 'normal';
};

type CVItem = {
  _key?: string;
  _type?: 'cvItem';
  text?: string;
  title?: PortableTextBlock[];
};

type CVGroup = {
  _key?: string;
  _type?: 'cvGroup';
  title?: string;
  titleV2?: PortableTextBlock[];
  entries?: CVItem[];
};

type InfoPageDocument = {
  _id: string;
  _type: 'infoPage';
  cv?: CVGroup[];
};

const stringToBlocks = (value: string, key: string): PortableTextBlock[] => [
  {
    _key: `${key}-block`,
    _type: 'block',
    children: [
      {
        _key: `${key}-span`,
        _type: 'span',
        marks: [],
        text: value,
      },
    ],
    markDefs: [],
    style: 'normal',
  },
];

export default defineMigration({
  title: 'Copy CV plain text fields into rich text counterparts',
  documentTypes: ['infoPage'],
  migrate: {
    document(doc) {
      const infoPage = doc as InfoPageDocument;

      if (!infoPage.cv?.length) return;

      let hasChanges = false;

      const nextCv = infoPage.cv.map((group, groupIndex) => {
        const nextGroup = { ...group };

        if (!group.titleV2?.length && group.title) {
          nextGroup.titleV2 = stringToBlocks(
            group.title,
            group._key || `group-${groupIndex}`,
          );
          hasChanges = true;
        }

        if (group.entries?.length) {
          nextGroup.entries = group.entries.map((entry, entryIndex) => {
            if (entry.title?.length || !entry.text) {
              return entry;
            }

            hasChanges = true;
            return {
              ...entry,
              title: stringToBlocks(
                entry.text,
                entry._key ||
                  `${group._key || `group-${groupIndex}`}-entry-${entryIndex}`,
              ),
            };
          });
        }

        return nextGroup;
      });

      if (!hasChanges) return;

      return patch(infoPage._id, at('cv', set(nextCv)));
    },
  },
});
