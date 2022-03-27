import { SanityCodegenConfig } from '@sanity-codegen/cli';

const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.ts',
  schemaTypesOutputPath: '../types/generated-sanity.d.ts',
};

export default config;
