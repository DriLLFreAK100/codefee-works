import {
  createContext,
  FC,
  ComponentClass,
  useMemo,
  useReducer,
  Reducer,
  useEffect,
} from 'react';
import { EventEmitter } from 'utils';
import {
  defineModel,
  ReducerAction,
  Model,
  Action,
  ModelAction,
  GLOBAL_STORE,
} from '../base';

const StoreContext = createContext<typeof GLOBAL_STORE>({});
const StoreProvider = StoreContext.Provider;

export const withStore = (Component: FC | ComponentClass) => {
  return (props: any) => (
    <StoreProvider value={GLOBAL_STORE}>
      <Component {...props}></Component>
    </StoreProvider>
  );
};

export const defineStore = (scope: string) => {
  const withModel: typeof defineModel = (model) => {
    if (!GLOBAL_STORE[scope]) {
      GLOBAL_STORE[scope] = {
        definition: defineModel(model),
        eventEmitter: new EventEmitter(),
        state: model.state,
      };
    }

    return GLOBAL_STORE[scope].definition;
  };

  return {
    withModel,
  };
};

const useStore = <S, A extends Record<string, ReducerAction<S>>>({
  scope,
}: Model<S, A>): [S, ModelAction<A>] => {
  const { definition, eventEmitter, state } = GLOBAL_STORE[scope];

  const replacer = useMemo(
    (): Reducer<S, Action<keyof A>> => (_, action) => action.payload,
    []
  );

  const [store, dispatch] = useReducer(replacer, state);

  const dispatcher = useMemo(() => {
    return Object.entries(definition.actions).reduce((acc, curr) => {
      const [type] = curr;
      (acc as any)[type] = (payload: any) => {
        const latestState = definition.actions[type](store, payload);
        eventEmitter.publish(scope, latestState);
      };

      return acc;
    }, {} as ModelAction<A>);
  }, [definition.actions, eventEmitter, scope, store]);

  useEffect(() => {
    const sync = (state: S) => dispatch({ type: '', payload: state });
    eventEmitter.subscribe(scope, sync);

    return () => {
      eventEmitter.unsubscribe(scope, sync);
    };
  }, [eventEmitter, scope]);

  return [store, dispatcher];
};

export default useStore;
