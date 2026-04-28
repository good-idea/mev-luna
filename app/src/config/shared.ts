import * as z from 'zod';

export const appEnvSchema = z.enum(['development', 'staging', 'production']);

export type AppEnv = z.infer<typeof appEnvSchema>;

const getAppEnv = (): AppEnv => {
  const vercelEnv = process.env.VERCEL_ENV;
  const nodeEnv = process.env.NODE_ENV;

  if (vercelEnv === 'production' || nodeEnv === 'production') {
    return 'production';
  }

  if (vercelEnv === 'preview' || vercelEnv === 'staging') {
    return 'staging';
  }

  return 'development';
};

const sharedConfigSchema = z.object({
  appEnv: appEnvSchema,
  sanity: z.object({
    projectId: z.string(),
    dataset: z.enum(['production', 'staging']),
  }),
});

export type SharedConfig = z.infer<typeof sharedConfigSchema>;

export const sharedConfig = sharedConfigSchema.parse({
  appEnv: getAppEnv(),
  sanity: {
    projectId: 'gdnvm86b',
    dataset: 'production',
  },
});
