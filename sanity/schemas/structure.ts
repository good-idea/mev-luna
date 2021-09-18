import S from '@sanity/desk-tool/structure-builder';
import { BiHomeSmile } from 'react-icons/bi';
import { AiOutlineContacts } from 'react-icons/ai';
import {
  IoFingerPrintSharp,
  IoLibrarySharp,
  IoDocumentsOutline,
} from 'react-icons/io5';

export default () =>
  S.list()
    .title('Mev Luna')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(BiHomeSmile)
        .child(S.editor().id('homepage').schemaType('homepage').id('homePage')),

      S.listItem()
        .title('Info')
        .icon(AiOutlineContacts)
        .child(S.editor().id('infoPage').schemaType('infoPage').id('infoPage')),

      S.documentTypeListItem('project')
        .title('Projects')
        .icon(IoDocumentsOutline),

      S.documentTypeListItem('research').title('Research').icon(IoLibrarySharp),

      S.documentTypeListItem('trace').title('Traces').icon(IoFingerPrintSharp),
    ]);
