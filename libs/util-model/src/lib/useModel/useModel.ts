import { useReducer, Reducer, useMemo } from 'react';
import { Action, ActionProxy, Model, ModelAction } from '../base';

const useModel = <S, A extends Record<string, ModelAction<S>>>(
  model: Model<S, A>
): [S, ActionProxy<A>] => {
  const reducer = useMemo(
    (): Reducer<S, Action<keyof A>> => (prevState, action) => {
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
    }, {} as ActionProxy<A>);
  }, [model.actions]);

  return [store, dispatcher];
};

export default useModel;
