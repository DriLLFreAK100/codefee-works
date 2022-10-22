import { act, renderHook } from '@testing-library/react';
import useModel, { define } from './useModel';

describe('useModel', () => {
  test('should be able to create model', () => {
    const mockModel = define({
      state: {
        value: 'initial'
      },
      actions: {
        setValue: (state, payload) => {
          state.value = payload;
          return { ...state };
        }
      }
    })

    const { result } = renderHook(() => useModel(mockModel))
    const [{ value }, { setValue }] = result.current;
    expect(value).toBe('initial');

    act(() => setValue('updated'));
    expect(result.current[0].value).toBe('updated')
  });
})