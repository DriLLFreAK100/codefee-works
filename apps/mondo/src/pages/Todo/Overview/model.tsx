import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataColumnDefinition, IconButton } from 'codefee-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faLink,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { useLoading } from 'hooks';

import { Todo, TodoService } from '@mondo/generated';

type ActionType = 'view' | 'edit' | 'link' | 'delete';

const useTodoOverviewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [target, setTarget] = useState<Todo | undefined>(undefined);
  const [action, setAction] = useState<ActionType | undefined>(undefined);
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

  const handleOpenDialog = useCallback(
    (action: ActionType, todo: Todo) => () => {
      setTarget(todo);
      setAction(action);
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setTarget(undefined);
    setAction(undefined);
  }, []);

  const handleDelete = useCallback(async () => {
    if (target && action === 'delete') {
      setTodos((prev) => prev.filter((p) => p.id !== target.id));
      setTarget(undefined);

      await withLoading(() => TodoService.deleteTodo(target.id));
    }
  }, [action, target, withLoading]);

  const isPerformAction = (target: ActionType) =>
    Boolean(target) && action === target;

  const colDefs: DataColumnDefinition[] = [
    {
      id: 1,
      field: 'title',
      header: 'Title',
    },
    {
      id: 2,
      field: 'status',
      header: 'Status',
    },
    {
      id: 3,
      field: 'operation',
      header: '',
      fixedSize: 200,
      render: (_, todo: Todo) => {
        return (
          <>
            <IconButton
              variant="subtle"
              className="text-primary"
              onClick={handleOpenDialog('view', todo)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </IconButton>
            <IconButton
              variant="subtle"
              className="text-primary"
              onClick={handleClickEdit(todo)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton
              variant="subtle"
              className="text-primary"
              onClick={handleOpenDialog('link', todo)}
            >
              <FontAwesomeIcon icon={faLink} />
            </IconButton>
            <IconButton
              variant="subtle"
              className="text-error"
              onClick={handleOpenDialog('edit', todo)}
            >
              <FontAwesomeIcon icon={faTrash} />
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
    target,
    todos,
    colDefs,
    isPerformAction,
    handleClickCreate,
    handleOpenDialog,
    handleCloseDialog,
    handleDelete,
  };
};

export default useTodoOverviewModel;
