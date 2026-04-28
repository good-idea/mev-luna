export type Status = 'idle' | 'fetching' | 'success' | 'error';

export interface State {
  status: Status;
  errorMessage: string | null;
}
