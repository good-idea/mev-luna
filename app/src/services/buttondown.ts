import { serverConfig } from 'src/config/server';

interface SubscribeOptions {
  email: string;
  ipAddress?: string;
}

interface ButtondownErrorResponse {
  detail?: string;
  error?: string;
  message?: string;
}

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as ButtondownErrorResponse;
    return (
      data.detail ||
      data.error ||
      data.message ||
      'Buttondown subscription request failed.'
    );
  } catch {
    return 'Buttondown subscription request failed.';
  }
};

export const subscribeToNewsletter = async ({
  email,
  ipAddress,
}: SubscribeOptions): Promise<void> => {
  const response = await fetch(
    `${serverConfig.buttondown.apiBaseUrl}/subscribers`,
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${serverConfig.buttondown.apiKey}`,
        'Content-Type': 'application/json',
        'X-Buttondown-Collision-Behavior': 'overwrite',
      },
      body: JSON.stringify({
        email_address: email,
        ip_address: ipAddress,
      }),
    },
  );

  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new Error(errorMessage);
  }
};
