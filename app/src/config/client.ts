import * as z from 'zod';

const clientConfigSchema = z.object({});

export type ClientConfig = z.infer<typeof clientConfigSchema>;

export const clientConfig = clientConfigSchema.parse({});
