import * as z from 'zod';

const requiredString = (name: string) =>
  z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} is required`,
    })
    .min(1, `${name} is required`);

const serverConfigSchema = z.object({
  buttondown: z.object({
    apiKey: requiredString('BUTTONDOWN_API_KEY'),
    apiBaseUrl: z.string().url().default('https://api.buttondown.email/v1'),
  }),
});

export type ServerConfig = z.infer<typeof serverConfigSchema>;

export const serverConfig = serverConfigSchema.parse({
  buttondown: {
    apiKey: process.env.BUTTONDOWN_API_KEY,
    apiBaseUrl:
      process.env.BUTTONDOWN_API_BASE_URL || 'https://api.buttondown.email/v1',
  },
});
