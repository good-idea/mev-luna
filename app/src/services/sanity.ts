import { createClient } from '@sanity/client';
import { config } from '../config';

const { sanity, env } = config;
const { projectId, dataset } = sanity;

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: env === 'production',
  apiVersion: '2021-09-15',
});
