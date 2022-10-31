type Todo = {
  id: number;
  title: string;
};

const getTodos = async () => {
  const data = await new Promise<Todo[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, title: 'todo 1' },
          { id: 2, title: 'todo 2' },
        ]),
      3000
    )
  );
  return data;
};

const TodoPage = async () => {
  const todos = await getTodos();

  return (
    <>
      <ul>
        {todos.map((t) => {
          return <li key={t.id}>{t.title}</li>;
        })}
      </ul>
    </>
  );
};

export default TodoPage;
