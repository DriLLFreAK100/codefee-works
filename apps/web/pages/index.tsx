import { Button } from 'ui';
import { defineModel, useModel } from 'modelite';

const model = defineModel({
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

export default function Web() {
  const [store, actions] = useModel(model);

  return (
    <>
      <ul>
        {store.todos.map((t) => {
          return <li key={t}>{t}</li>;
        })}
      </ul>
      <button onClick={() => actions.setTodos(Math.random())}>Push</button>
    </>
  );
}
