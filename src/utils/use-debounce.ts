import { useCallback, useRef } from 'react';

type DebounceFunc = (...args: any[]) => any;

export const useDebounce = <C extends DebounceFunc>(
  callback: C,
  delay: number,
) => {
  const timeout = useRef<NodeJS.Timeout | number>(0);

  const debouncedFunction = function (this: any, ...args: any[]) {
    // Remove any previous timeouts
    clearTimeout(timeout.current as number);

    // Create next timeout
    timeout.current = setTimeout(() => callback.apply(this, args), delay);
  };

  return useCallback(debouncedFunction, [delay]);
};
