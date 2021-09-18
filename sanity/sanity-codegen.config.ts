import { SanityCodegenConfig } from '@sanity-codegen/cli';

const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.ts',
  outputPath: '../types/generated-sanity.d.ts',
};

export default config;
