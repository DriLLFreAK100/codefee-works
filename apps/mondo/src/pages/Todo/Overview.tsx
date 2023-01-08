import { useEffect, useState } from 'react';
import { Button, DataColumnDefinition, Table, Typography } from 'codefee-kit';
import { useNavigate } from 'react-router-dom';

import { Todo, TodoService } from 'generated';
import i18n from 'i18n/i18n';

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
  const navigate = useNavigate();

  const handleClickCreate = () => navigate('/todo/create');

  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography type="h4">{i18n.get('Overview')}</Typography>
        <Button onClick={handleClickCreate}>{i18n.get('+ Add Item')}</Button>
      </div>
      <Table data={todos} colDefs={colDefs} />
    </>
  );
};

export default Overview;
