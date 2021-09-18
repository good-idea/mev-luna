import { SanityCodegenConfig } from '@sanity-codegen/cli';

const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.ts',
  schemaTypesOutputPath: '../types/generated-sanity.d.ts',
  schemaJsonOutputPath: '../types/generated-sanity.shema.json',
  babelOptions: require('./.babelrc.codegen.js'),
};

export default config;
