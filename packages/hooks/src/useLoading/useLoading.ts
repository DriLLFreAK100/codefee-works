import { useCallback, useState } from 'react';

/**
 * This hook provides a wrapper to work with the usual loading management
 * @returns A loading indicator and a method to wrap async actions to wait for
 */
const useLoading = <T, P>() => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = useCallback(
    async (action: (...args: P[]) => Promise<T>) => {
      setIsLoading(true);
      await action();
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    withLoading,
  };
};

export default useLoading;
