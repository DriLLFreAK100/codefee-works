/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, Reducer, useMemo } from 'react'

type OmitFirstArgFunc<T> = T extends (firstArg: any, ...args: infer RestArgs) => any ? (...args: RestArgs) => any : T;

type Action<ActionType> = {
  type: ActionType;
  payload?: any;
}

type ModelAction<State> = (prevState: State, payload?: any) => State;

type ActionProxy<A> = { [key in keyof A]: OmitFirstArgFunc<A[key]> };

export type Model<S, A extends Record<string, ModelAction<S>> = Record<string, ModelAction<S>>> = {
  state: S;
  actions: A;
}

export const define = <S, A extends Record<string, ModelAction<S>>>(model: Model<S, A>) => model;

const useModel = <S, A extends Record<string, ModelAction<S>>>(
  model: Model<S, A>,
): [S, ActionProxy<A>] => {
  const reducer = useMemo((): Reducer<S, Action<keyof A>> => (prevState, action) => {
    return model.actions[action.type](prevState, action.payload) as S;
  }, [model.actions])

  const [store, dispatch] = useReducer(reducer, model.state);

  const dispatcher = useMemo(() => {
    return Object.entries(model.actions).reduce((acc, curr) => {
      const [type] = curr;
      (acc as any)[type] = (payload: any) => dispatch({ type, payload })

      return acc;
    }, {} as ActionProxy<A>)
  }, [model.actions]);

  return [store, dispatcher]
}

export default useModel;


