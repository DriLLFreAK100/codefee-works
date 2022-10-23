/**
 * Return an infer type with first arg in the function omitted
 */
export type OmitFirstArgFunc<T> = T extends (
  firstArg: any,
  ...args: infer RestArgs
) => any
  ? (...args: RestArgs) => any
  : T;

/**
 * Action object struct
 */
export type Action<ActionType> = {
  /**
   * Reducer action type. Has a 1-1 mapping relation with model's action name
   */
  type: ActionType;
  /**
   * Payload for an action
   */
  payload?: any;
};

/**
 * Corresponds to an Action signature of a reducer
 */
export type ReducerAction<State> = (prevState: State, payload?: any) => State;

/**
 * A Model's Action. Same as `ReducerAction` type, just with first param (prevState) excluded
 */
export type ModelAction<A> = { [key in keyof A]: OmitFirstArgFunc<A[key]> };

/**
 * A Model Definition
 */
export type Model<
  S,
  A extends Record<string, ReducerAction<S>> = Record<string, ReducerAction<S>>
> = {
  /**
   * Mainly used for global store's model namespace separation
   */
  scope: string;
  /**
   * Initial state of the model
   */
  state: S;
  /**
   * Action supported for the model
   */
  actions: A;
};

/**
 * The metadata of a model
 */
export type ModelMeta = {
  definition: Model<any, any>;
  state: any;
};

/**
 * Return a proper typed Model
 * @param model The Model Definition
 * @returns
 */
export const defineModel = <S, A extends Record<string, ReducerAction<S>>>(
  model: Model<S, A>
) => model;

/**
 * The global instance of a stateful store
 */
export const GLOBAL_STORE: Record<string, ModelMeta> = {};
