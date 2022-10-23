import { act, renderHook } from '@testing-library/react';
import useModel from './useModel';
import { defineModel } from '../base';

describe('useModel', () => {
  test('should be able to create model', () => {
    const mockModel = defineModel({
      scope: 'moduleABC',
      state: {
        value: 'initial',
      },
      actions: {
        setValue: (state, payload) => {
          state.value = payload;
          return { ...state };
        },
      },
    });

    const { result } = renderHook(() => useModel(mockModel));
    const [{ value }, { setValue }] = result.current;
    expect(value).toBe('initial');

    act(() => setValue('updated'));
    expect(result.current[0].value).toBe('updated');
  });
});
