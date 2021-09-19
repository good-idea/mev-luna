import Client from '@sanity/client';
import { config } from '../config';

const { sanity, env } = config;
const { projectId, dataset } = sanity;

export const sanityClient = new Client({
  projectId,
  dataset,
  useCdn: env === 'production',
  apiVersion: '2021-09-15',
});
