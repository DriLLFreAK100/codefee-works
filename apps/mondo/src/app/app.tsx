import styled from 'styled-components';
import { useModel } from '@codefee/model';

import todoModel from './models/todo';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [{ editingName, todos }, actions] = useModel(todoModel);

  return (
    <StyledApp>
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
        <input
          aria-label="todo-name-input"
          value={editingName}
          onChange={(e) => actions.handleSetEditingName(e.target.value)}
        />
        <button onClick={actions.handleCreate}>Save</button>
      </div>
    </StyledApp>
  );
}

export default App;
