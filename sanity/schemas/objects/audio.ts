export const audio = {
  name: 'audio',
  title: 'Audio',
  type: 'file',
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'richText',
    },
    {
      title: 'Transcription',
      name: 'transcription',
      type: 'richText',
    },
  ],
  options: {
    accept: 'audio/mp3',
  },
};
