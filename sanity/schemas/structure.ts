import S from '@sanity/desk-tool/structure-builder';
import { BiHomeSmile } from 'react-icons/bi';
import { AiOutlineContacts } from 'react-icons/ai';
import {
  IoFingerPrintSharp,
  IoLibrarySharp,
  IoDocumentsOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

export default () =>
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

      S.documentTypeListItem('project')
        .id('projects')
        .title('Projects')
        .icon(IoDocumentsOutline),

      S.listItem()
        .id('researchPage')
        .title('Research (Main page)')
        .icon(IoLibrarySharp)
        .child(S.document().schemaType('researchPage').id('researchPage')),

      S.documentTypeListItem('research')
        .id('research')
        .title('Research')
        .icon(IoLibrarySharp),

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

      S.listItem()
        .id('siteSettings')
        .title('Site Settings')
        .icon(IoSettingsOutline)
        .child(S.document().schemaType('siteSettings').id('siteSettings')),
    ]);
