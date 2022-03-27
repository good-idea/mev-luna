import * as React from 'react';
import { render } from 'testing-library';
import { getSizes } from '../utils';

describe('Image', () => {
  it.skip('should ...', async () => {
    // const { getByText } = render(<Image />)
  });
});

describe('Image: getSizes', () => {
  it('should return a string of image sizes joined with media queries', () => {
    const result = getSizes(['100vw', '80vw', '500px']);
    expect(result).toBe(
      '(max-width: 550px) 100vw, (max-width: 850px) 80vw, 500px',
    );
  });

  it('should use the final value in the array as the default size (no media query)', () => {
    const resultOne = getSizes(['100vw', '500px']);
    expect(resultOne).toBe('(max-width: 550px) 100vw, 500px');

    const resultTwo = getSizes(['80vw']);
    expect(resultTwo).toBe('80vw');
  });
});
