import { describe, beforeEach, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import useLoadable from './useLoadable';

describe('useLoadable', () => {
  let promise: () => Promise<string>;

  beforeEach(() => {
    promise = vi.fn().mockResolvedValue('data');
  });

  test('should set isLoading to true and data to undefined initially', async () => {
    const { result } = renderHook(() => useLoadable(promise));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(undefined);
  });

  test('should set isLoading to true and data to the resolved value of the promise when loadFunc is called', async () => {
    const { result } = renderHook(() => useLoadable(promise));
    act(() => {
      result.current.load(promise);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe('data');
    });
  });

  test('should reload the data by increasing the mutateTrigger when reload is called', async () => {
    const { result } = renderHook(() => useLoadable(promise));
    act(() => {
      result.current.reload();
    });
    expect(result.current.mutateTrigger).toBe(1);
  });

  test('should update the data when mutate is called', async () => {
    const { result } = renderHook(() => useLoadable(promise));
    act(() => {
      result.current.mutate('newData');
    });
    expect(result.current.data).toBe('newData');
  });
});
