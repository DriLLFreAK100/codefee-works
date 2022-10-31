import { useReducer, Reducer, useMemo, useCallback } from 'react';
import { Action, ModelAction, Model, ReducerAction } from '../base';

const useModel = <S, A extends Record<string, ReducerAction<S>>>(
  model: Model<S, A>
): [S, ModelAction<A>] => {
  const reducer = useCallback<Reducer<S, Action<keyof A>>>(
    (prevState, action) => {
      return model.actions[action.type](prevState, action.payload) as S;
    },
    [model.actions]
  );

  const [store, dispatch] = useReducer(reducer, model.state);

  const dispatcher = useMemo(() => {
    return Object.entries(model.actions).reduce((acc, curr) => {
      const [type] = curr;
      (acc as any)[type] = (payload: any) => dispatch({ type, payload });

      return acc;
    }, {} as ModelAction<A>);
  }, [model.actions]);

  return [store, dispatcher];
};

export default useModel;
