import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataColumnDefinition, IconButton } from 'codefee-kit';

import { useLoading } from 'hooks';

import { Todo, TodoService } from '@mondo/generated';
import Trash from '@mondo/components/Trash';

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
  {
    id: 3,
    field: 'operation',
    header: '',
    size: 0.12,
    render: () => {
      return (
        <IconButton variant="subtle" className="text-error">
          <Trash />
        </IconButton>
      );
    },
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
