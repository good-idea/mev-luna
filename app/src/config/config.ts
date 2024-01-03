import * as z from 'zod';

type Env = 'staging' | 'production' | 'development' | 'test';

const env: Env = (process.env.NODE_ENV as Env) || 'development';

const configSchema = z.object({
  env: z.enum(['production', 'development', 'staging', 'test']),
  sanity: z.object({
    projectId: z.string(),
    dataset: z.enum(['production', 'staging']),
  }),
  // sentry: z.object({
  //   /* Make sure we only run sentry in production */
  //   dsn: isProd ? z.string() : z.undefined(),
  //   release: isProd ? z.string() : z.undefined(),
  // }),
});

export type Config = z.infer<typeof configSchema>;

const initialConfig = {
  env,
  sanity: {
    projectId: 'gdnvm86b',
    dataset: 'production',
  },
  // sentry: {
  //   dsn: isProd ? process.env.NEXT_PUBLIC_SENTRY_DSN : undefined,
  //   release: isProd ? process.env.NEXT_PUBLIC_RELEASE : undefined,
  // },
};

/* Export the parsed config so TS knows that the values must exist */
export const config = configSchema.parse(initialConfig);
