import * as React from 'react';
import { x } from '@xstyled/styled-components';
import { BodyHeading } from '../Text';
import { State } from './types';
import { Form, Input, MessageWrapper } from './styled';
import { Button } from '../Button';

const { useReducer, useState } = React;

type Action =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; errorMessage: string }
  | { type: 'RESET' };

const initialState: State = {
  status: 'idle',
  errorMessage: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SUBMIT':
      return {
        status: 'fetching',
        errorMessage: null,
      };
    case 'SUCCESS':
      return {
        status: 'success',
        errorMessage: null,
      };
    case 'ERROR':
      return {
        status: 'error',
        errorMessage: action.errorMessage,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const NewsletterSignup: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Unable to subscribe right now.');
      }

      dispatch({ type: 'SUCCESS' });
      setEmail('');
    } catch (error) {
      dispatch({
        type: 'ERROR',
        errorMessage:
          error instanceof Error
            ? error.message
            : 'Unable to subscribe right now.',
      });
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state.status === 'error') {
      dispatch({ type: 'RESET' });
    }

    setEmail(event.target.value);
  };

  return (
    <x.section
      mb="48px"
      pb="24px"
      borderBottom="1px solid"
      borderColor="currentColor"
    >
      <BodyHeading as="h1" $strong>
        Newsletter
      </BodyHeading>
      {state.status === 'success' ? null : (
        <Form onSubmit={handleSubmit} $status={state.status}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            disabled={state.status === 'fetching'}
            required
          />
          <Button
            type="submit"
            disabled={state.status === 'fetching'}
            label="Sign up"
          />
        </Form>
      )}
      {state.status === 'success' ? (
        <MessageWrapper>
          <x.p mb={0} mt={0}>
            Thanks for subscribing.
          </x.p>
        </MessageWrapper>
      ) : null}
      {state.status === 'error' && state.errorMessage ? (
        <x.p mb={0} mt="12px">
          {state.errorMessage}
        </x.p>
      ) : null}
    </x.section>
  );
};
