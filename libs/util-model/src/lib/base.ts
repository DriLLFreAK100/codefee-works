export type OmitFirstArgFunc<T> = T extends (
  firstArg: any,
  ...args: infer RestArgs
) => any
  ? (...args: RestArgs) => any
  : T;

export type Action<ActionType> = {
  type: ActionType;
  payload?: any;
};

export type ModelAction<State> = (prevState: State, payload?: any) => State;

export type ActionProxy<A> = { [key in keyof A]: OmitFirstArgFunc<A[key]> };

export type Model<
  S,
  A extends Record<string, ModelAction<S>> = Record<string, ModelAction<S>>
> = {
  scope: string;
  state: S;
  actions: A;
};

export type StoreMeta = {
  definition: Model<any, any>;
  state: any;
};

export const defineModel = <S, A extends Record<string, ModelAction<S>>>(
  model: Model<S, A>
) => model;

export const GLOBAL_STORE: Record<string, StoreMeta> = {};
