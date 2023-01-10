import debounce from 'lodash-es/debounce';
import merge from 'lodash-es/merge';
import { useCallback, useEffect, useState } from 'react';

type LoadFunc = <T extends unknown>(request: () => Promise<any>) => Promise<T>;

type UseLoadableOptions = {
  debounceRate?: number;
  deps?: any[];
};

const defaultOptions: UseLoadableOptions = {
  debounceRate: 0,
  deps: [],
};

const useLoadable = <T extends any>(
  loadFunc?: () => Promise<T> | undefined,
  options?: UseLoadableOptions
) => {
  const { debounceRate, deps } = merge(defaultOptions, options);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [mutateTrigger, setMutateTrigger] = useState(0);

  const load: LoadFunc = useCallback(async (request) => {
    setIsLoading(true);
    const data = await request();
    setIsLoading(false);

    return data;
  }, []);

  const reload = useCallback(() => setMutateTrigger((prev) => prev + 1), []);

  const mutate = useCallback((data: T) => setData(data), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLoadFunc = useCallback(
    debounce(() => {
      if (loadFunc) {
        Promise.resolve()
          .then(() => setIsLoading(true))
          .then(() => loadFunc?.())
          .then((val) => setData(val))
          .finally(() => setIsLoading(false));
      }
    }, debounceRate),
    []
  );

  useEffect(
    () => debouncedLoadFunc(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutateTrigger, ...deps!]
  );

  return {
    isLoading,
    data,
    mutateTrigger,
    load: debounce((req) => load(req), debounceRate) as LoadFunc,
    reload,
    mutate,
  };
};

export default useLoadable;
