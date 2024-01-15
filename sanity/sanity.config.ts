import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/schema';
import { structure } from './schemas/structure';

const config = defineConfig({
  name: 'default',
  title: 'Mev Luna',

  projectId: 'gdnvm86b',
  dataset: 'production',

  plugins: [deskTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});

export default config;
