export const richTextFragment = `...`;

export const seoFragment = `...`;

export const imageFragment = `
  ...,
  asset->{
    _id,
    extension,
    metadata {
      dimensions
    },
    mimeType,
    path,
    url
  }
`;

export const audioFragment = `
  _type,
  asset->{
    ...
  },
  description {
    ${richTextFragment}
  },
  transcription {
    ${richTextFragment}
  },
`;

export const videoFragment = `
  _type,
  title,
  versions[]{
    label,
    vimeoId
  },
`;

export const galleryFragment = `
_type,
  title,
  media[]{
    _type == 'richImage' => {
      ${imageFragment}
    },
    _type == 'audio' => {
      ${audioFragment}
    },
    _type == 'video' => {
      ${videoFragment}
    },
  }
`;
