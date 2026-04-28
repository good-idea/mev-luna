import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { subscribeToNewsletter } from 'src/services/buttondown';

const subscribeSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});

type SubscribeResponse = {
  ok: boolean;
  error?: string;
};

const getIpAddress = (req: NextApiRequest): string | undefined => {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0]?.trim() || undefined;
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(',')[0]?.trim() || undefined;
  }

  return req.socket.remoteAddress || undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const parsedBody = subscribeSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      ok: false,
      error: parsedBody.error.issues[0]?.message || 'Invalid request body.',
    });
  }

  try {
    await subscribeToNewsletter({
      ...parsedBody.data,
      ipAddress: getIpAddress(req),
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(502).json({
      ok: false,
      error: 'Unable to subscribe right now. Please try again soon.',
    });
  }
}
