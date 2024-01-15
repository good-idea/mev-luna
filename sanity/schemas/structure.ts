import { StructureBuilder, StructureResolver } from 'sanity/desk';
import { BiHomeSmile } from 'react-icons/bi';
import { AiOutlineContacts } from 'react-icons/ai';
import {
  IoFingerPrintSharp,
  IoLibrarySharp,
  IoNewspaperOutline,
  IoDocumentsOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mev Luna')
    .items([
      S.listItem()
        .id('homepage')
        .title('Homepage')
        .icon(BiHomeSmile)
        .child(S.document().schemaType('homepage').id('homepage')),

      S.listItem()
        .id('info')
        .title('Info')
        .icon(AiOutlineContacts)
        .child(S.document().schemaType('infoPage').id('infoPage')),

      S.divider(),

      S.documentTypeListItem('project')
        .id('projects')
        .title('Projects')
        .icon(IoDocumentsOutline),

      S.divider(),

      S.listItem()
        .id('newsPage')
        .title('News (Main page)')
        .icon(IoNewspaperOutline)
        .child(S.document().schemaType('newsPage').id('newsPage')),

      S.documentTypeListItem('newsItem')
        .id('news')
        .title('News')
        .icon(IoNewspaperOutline),

      S.divider(),

      S.listItem()
        .id('researchPage')
        .title('Research (Main page)')
        .icon(IoLibrarySharp)
        .child(S.document().schemaType('researchPage').id('researchPage')),

      S.documentTypeListItem('research')
        .id('research')
        .title('Research')
        .icon(IoLibrarySharp),

      S.divider(),

      S.listItem()
        .id('traces')
        .title('Traces')
        .icon(IoFingerPrintSharp)
        .child(
          S.documentList()
            .title('Traces')
            .filter(`_type == "trace"`)
            .initialValueTemplates([]),
        ),

      S.divider(),

      S.listItem()
        .id('siteSettings')
        .title('Site Settings')
        .icon(IoSettingsOutline)
        .child(S.document().schemaType('siteSettings').id('siteSettings')),
    ]);
