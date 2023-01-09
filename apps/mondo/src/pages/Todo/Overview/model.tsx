import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataColumnDefinition, IconButton } from 'codefee-kit';

import { useLoading } from 'hooks';

import { Todo, TodoService } from '@mondo/generated';
import Trash from '@mondo/components/Icons/Trash';
import Edit from '@mondo/components/Icons/Edit';

const useTodoOverviewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Todo | undefined>(undefined);
  const { isLoading, withLoading } = useLoading();
  const navigate = useNavigate();

  const handleClickCreate = useCallback(
    () => navigate('/todo/create'),
    [navigate]
  );

  const handleClickEdit = useCallback(
    (todo: Todo) => () => navigate(`/todo/edit/${todo.id}`),
    [navigate]
  );

  const handleOpenDeleteDialog = useCallback(
    (todo: Todo) => () => setDeleteTarget(todo),
    []
  );

  const handleCloseDeleteDialog = useCallback(
    () => setDeleteTarget(undefined),
    []
  );

  const handleDelete = useCallback(async () => {
    if (deleteTarget) {
      setTodos((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(undefined);

      await withLoading(() => TodoService.deleteTodo(deleteTarget.id));
    }
  }, [deleteTarget, withLoading]);

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
    {
      id: 3,
      field: 'operation',
      header: '',
      size: 0.2,
      render: (_, todo: Todo) => {
        return (
          <>
            <IconButton
              variant="subtle"
              className="text-primary"
              onClick={handleClickEdit(todo)}
            >
              <Edit />
            </IconButton>
            <IconButton
              variant="subtle"
              className="text-error"
              onClick={handleOpenDeleteDialog(todo)}
            >
              <Trash />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    withLoading(async () => {
      const res = await TodoService.getTodos();
      setTodos(res);
    });
  }, [withLoading]);

  return {
    isLoading,
    isOpenConfirmDelete: Boolean(deleteTarget),
    todos,
    colDefs,
    handleClickCreate,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDelete,
  };
};

export default useTodoOverviewModel;
