import debounce from 'lodash-es/debounce';
import { useCallback, useEffect, useState } from 'react';

type LoadFunc = <T extends unknown>(request: () => Promise<any>) => Promise<T>;

const debounceRate = 100;

const useLoadable = <T extends any>(
  loadFunc?: () => Promise<T> | undefined
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [mutateTrigger, setMutateTrigger] = useState(0);

  const load: LoadFunc = useCallback(async (request) => {
    setIsLoading(true);
    const data = await request();
    setIsLoading(false);

    return data;
  }, []);

  const mutate = useCallback(() => setMutateTrigger((prev) => prev + 1), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLoadFunc = useCallback(
    debounce(() => {
      Promise.resolve()
        .then(() => setIsLoading(true))
        .then(() => loadFunc?.())
        .then((val) => setData(val))
        .then(() => setIsLoading(false));
    }, debounceRate),
    [loadFunc]
  );

  useEffect(() => debouncedLoadFunc(), [debouncedLoadFunc, mutateTrigger]);

  return {
    isLoading,
    data,
    load: debounce((req) => load(req), debounceRate) as LoadFunc,
    mutate,
  };
};

export default useLoadable;
