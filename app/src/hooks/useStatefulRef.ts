import { useState, useRef } from 'react';

export interface StatefulRef<T> {
  current: T | null;
}

/**
 * React's useRef returns a mutable reference to the ref element.
 * This means that you can't use it as a dependency in functions like
 * useEffect.
 *
 * This hook acts the same as `useRef`, except it will trigger a state
 * update when the ref has been assigned.
 */

/* Copied from: https://github.com/Bedrock-Layouts/Bedrock/blob/90e564191d9e661d60af1f2d99e3b68fa6330c78/packages/use-stateful-ref/src/index.tsx */
export function useStatefulRef<T extends HTMLElement = HTMLElement>(
  initialVal = null,
) {
  // eslint-disable-next-line prefer-const
  let [cur, setCur] = useState<T | null>(initialVal);

  const { current: ref } = useRef({
    current: cur,
  });

  Object.defineProperty(ref, 'current', {
    get: () => cur as T,
    set: (value: T) => {
      if (!Object.is(cur, value)) {
        cur = value;
        setCur(value);
      }
    },
  });

  return ref as StatefulRef<T>;
}
