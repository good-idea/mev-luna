import { Media, RichImage } from '../types';

// export const isVideo = (obj: Media): obj is Video =>
//   Boolean(obj && obj._type === 'video');

// export const isAudio = (obj: Media): obj is Audio =>
//   Boolean(obj && obj._type === 'audio');

export const isImage = (obj: Media): obj is RichImage =>
  Boolean(obj && obj._type === 'richImage');
