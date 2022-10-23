import {
  createContext,
  FC,
  ComponentClass,
  useContext,
  useMemo,
  useReducer,
  Reducer,
} from 'react';
import {
  defineModel,
  ModelAction,
  Model,
  Action,
  ActionProxy,
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
    if (!GLOBAL_STORE[scope].definition) {
      GLOBAL_STORE[scope].definition = defineModel(model);
    }

    return GLOBAL_STORE[scope].definition;
  };

  return {
    withModel,
  };
};

const useStore = <S, A extends Record<string, ModelAction<S>>>(
  model: Model<S, A>
): [S, ActionProxy<A>] => {
  const reducer = useMemo(
    (): Reducer<S, Action<keyof A>> => (prevState, action) => {
      return model.actions[action.type](prevState, action.payload) as S;
    },
    [model.actions]
  );

  // TODO: Research on scoped event emitting topic to implement
  const [, dispatch] = useReducer(reducer, model.state);
  const store = useContext(StoreContext);

  const dispatcher = useMemo(() => {
    return Object.entries(model.actions).reduce((acc, curr) => {
      const [type] = curr;
      (acc as any)[type] = (payload: any) => dispatch({ type, payload });

      return acc;
    }, {} as ActionProxy<A>);
  }, [model.actions]);

  return [store[model.scope].state, dispatcher];
};

export default useStore;
