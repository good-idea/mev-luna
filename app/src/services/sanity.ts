import { createClient } from '@sanity/client';
import { sharedConfig } from '../config';

const { sanity, appEnv } = sharedConfig;
const { projectId, dataset } = sanity;

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: appEnv === 'production',
  apiVersion: '2021-09-15',
});
