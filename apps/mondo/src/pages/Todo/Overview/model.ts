import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataColumnDefinition } from 'codefee-kit';

import { Todo, TodoService } from 'generated';
import { useLoading } from 'hooks';

export const colDefs: DataColumnDefinition[] = [
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

const useTodoOverviewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isLoading, withLoading } = useLoading();
  const navigate = useNavigate();

  const handleClickCreate = useCallback(
    () => navigate('/todo/create'),
    [navigate]
  );

  useEffect(() => {
    withLoading(async () => {
      const res = await TodoService.getTodos();
      setTodos(res);
    });
  }, [withLoading]);

  return { isLoading, todos, handleClickCreate };
};

export default useTodoOverviewModel;
