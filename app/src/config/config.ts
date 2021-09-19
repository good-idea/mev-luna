import * as z from 'zod';
import packageJson from '../../package.json';

const release = packageJson.version;

type Env = 'staging' | 'production' | 'development' | 'test';

const env: Env = (process.env.NODE_ENV as Env) || 'development';
const context = process.env.CONTEXT;

const isProd = context !== 'sanity' && env === 'production';

const configSchema = z.object({
  env: z.enum(['production', 'development', 'staging', 'test']),
  sanity: z.object({
    projectId: z.string(),
    dataset: z.enum(['production', 'staging']),
  }),
  sentry: z.object({
    /* Make sure we only run sentry in production */
    dsn: isProd ? z.string() : z.undefined(),
    release: isProd ? z.string() : z.undefined(),
  }),
});

export type Config = z.infer<typeof configSchema>;

const initialConfig = {
  env,
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  sentry: {
    dsn: isProd ? process.env.NEXT_PUBLIC_SENTRY_DSN : undefined,
    release: isProd ? process.env.NEXT_PUBLIC_RELEASE : undefined,
  },
};

/* Export the parsed config so TS knows that the values must exist */
export const config = configSchema.parse(initialConfig);
