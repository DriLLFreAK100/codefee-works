import { DataColumnDefinition, Table, Typography } from 'codefee-kit';
import { Todo, TodoService } from 'generated';
import i18n from 'i18n/i18n';
import { useEffect, useState } from 'react';

const useData = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    TodoService.getTodos().then((r) => {
      setTodos(r);
    });
  }, []);

  return { todos };
};

const colDefs: DataColumnDefinition[] = [
  {
    id: 1,
    field: 'title',
    header: 'Title',
  },
  {
    id: 2,
    field: 'description',
    header: 'Description',
  },
];

const Overview = () => {
  const { todos } = useData();

  return (
    <div>
      <Typography type="h4">{i18n.get('Overview')}</Typography>
      <Table data={todos} colDefs={colDefs} />
    </div>
  );
};

export default Overview;
