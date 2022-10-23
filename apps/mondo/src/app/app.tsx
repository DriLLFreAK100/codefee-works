import styled from 'styled-components';
import { useStore, withStore, defineStore } from '@codefee/model';
import { v4 as uuid } from 'uuid';

const StyledApp = styled.div`
  // Your style here
`;

const Root = withStore(StyledApp);

const model = defineStore('todo').withModel({
  scope: 'todo',
  state: {
    todos: [] as string[],
  },
  actions: {
    setTodos: (state, payload) => {
      state.todos = [...state.todos, payload];
      return { ...state };
    },
  },
});

export function App() {
  const [store, actions] = useStore(model);

  return (
    <Root>
      <ul>
        {store.todos.map((t) => {
          return <li key={t}>{t}</li>;
        })}
      </ul>
      <button onClick={() => actions.setTodos(uuid())}>Push</button>
    </Root>
  );
}

export default App;
