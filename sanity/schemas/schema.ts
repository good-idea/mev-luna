// First, we must import the schema creator

import * as documents from './documents';
import * as objects from './objects';

export const schemaTypes = [
  ...Object.values(documents),
  ...Object.values(objects),
];
