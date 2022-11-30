import { defineModel, useModel } from 'modelite';
import { Input, Button } from 'codefee-kit';

type TodoStatus = 'created' | 'in-progress' | 'completed';

type Todo = {
  id: string | number;
  name: string;
  description?: string;
  status: TodoStatus;
};

type State = {
  editingName: string;
  todos: Todo[];
};

const initialState: State = {
  editingName: '',
  todos: [],
};

const todosModel = defineModel({
  scope: 'todos',
  state: {
    ...initialState,
  },
  actions: {
    handleCreate: (state: State) => {
      if (state.editingName) {
        return {
          todos: [
            ...state.todos,
            {
              id: Math.random(),
              name: state.editingName,
              status: 'created',
            } as Todo,
          ],
          editingName: '',
        };
      }
      return state;
    },
    handleSetEditingName: (state: State, value: string) => {
      return {
        ...state,
        editingName: value,
      };
    },
    handleDelete: (state: State, id: string | number) => {
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
      };
    },
  },
});

const TodoPage = () => {
  const [{ editingName, todos }, actions] = useModel(todosModel);

  return (
    <>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            {todo.name}{' '}
            <button onClick={() => actions.handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <Input
          aria-label="todo-name-input"
          value={editingName}
          onChange={(e) => actions.handleSetEditingName(e.target.value)}
        />
        <Button onClick={actions.handleCreate}>Save</Button>
      </div>
    </>
  );
};

export default TodoPage;
