import { FC, useEffect, useState } from 'react';

import { Transfer, TransferListItem } from 'ui';
import { useLoading } from 'hooks';

import i18n from '@mondo/i18n';
import { RelatedTodoResponse, Todo, TodoService } from '@mondo/generated';
import { LoadArea } from 'codefee-kit';

type TodoLinkerProps = {
  todoId: number;
  allTodos: Todo[];
};

const notRelated =
  (excludeId: number, relatedTodos: RelatedTodoResponse[]) => (target: Todo) =>
    target.id !== excludeId &&
    relatedTodos.find((tt) => tt.child_todo_id !== target.id);

const related =
  (excludeId: number, relatedTodos: RelatedTodoResponse[]) => (target: Todo) =>
    target.id !== excludeId &&
    relatedTodos.find((tt) => tt.child_todo_id === target.id);

const asSource = (target: Todo) => ({
  key: target.id,
  label: target.title,
  isSelected: false,
});

const asDestination = (target: Todo) => ({
  key: target.id,
  label: target.title,
  isSelected: true,
});

const useData = (id: number, todos: Todo[]) => {
  const { isLoading, withLoading } = useLoading();
  const [data, setData] = useState<[TransferListItem[], TransferListItem[]]>([
    [],
    [],
  ]);

  useEffect(() => {
    withLoading(async () => {
      const res = await TodoService.getTodo(id);

      if (res.related_todos.length === 0) {
        setData([todos.map(asSource), []]);
        return;
      }

      setData([
        todos.filter(notRelated(id, res.related_todos)).map(asSource),
        todos.filter(related(id, res.related_todos)).map(asDestination),
      ]);
    });
  }, [withLoading]);

  return { isLoading, data };
};

const TodoLinker: FC<TodoLinkerProps> = ({ todoId, allTodos }) => {
  const {
    data: [source, destination],
    isLoading,
  } = useData(todoId, allTodos);

  return (
    <LoadArea loading={isLoading}>
      <Transfer
        sourceTitle={i18n.get('Source')}
        sourceData={source}
        destinationTitle={i18n.get('Linked')}
        destinationData={destination}
      />
    </LoadArea>
  );
};

export default TodoLinker;
