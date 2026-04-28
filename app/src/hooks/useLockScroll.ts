import * as React from 'react';

/**
 * Locks the page's main scrolling element while a modal/lightbox is open.
 */
export const useLockScroll = (initialState = false) => {
  const [locked, setLocked] = React.useState(initialState);
  const previousOverflow = React.useRef<string | null>(null);

  const scrollingElement = React.useMemo(
    () =>
      typeof document !== 'undefined'
        ? document.getElementsByTagName('body')[0]
        : null,
    [],
  );

  const unlockScroll = React.useCallback(() => {
    if (scrollingElement) {
      scrollingElement.style.overflow = previousOverflow.current || '';
      previousOverflow.current = null;
    }
    setLocked(false);
  }, [scrollingElement]);

  const lockScroll = React.useCallback(() => {
    if (scrollingElement) {
      if (previousOverflow.current === null) {
        previousOverflow.current = scrollingElement.style.overflow;
      }
      scrollingElement.style.overflow = 'hidden';
    }
    setLocked(true);
  }, [scrollingElement]);

  React.useEffect(() => {
    if (initialState) lockScroll();

    return () => {
      if (previousOverflow.current !== null && scrollingElement) {
        scrollingElement.style.overflow = previousOverflow.current;
      }
    };
  }, [initialState, lockScroll, scrollingElement]);

  return {
    locked,
    unlockScroll,
    lockScroll,
  };
};
