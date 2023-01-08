import { act, renderHook, waitFor } from '@testing-library/react';
import useLoading from './useLoading';

test('should be able to show loading states correctly', async () => {
  const { result } = renderHook(() => useLoading());

  expect(result.current.isLoading).toBeFalsy();

  act(() => {
    result.current.withLoading(() => Promise.resolve(123));
  });

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => expect(result.current.isLoading).toBeFalsy());
});
