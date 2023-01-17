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

const notSelf = (id: number) => (target: Todo) => target.id !== id;

const notLinked = (relatedTodos: RelatedTodoResponse[]) => (target: Todo) =>
  !relatedTodos.find((tt) => tt.child_todo_id === target.id);

const linked = (relatedTodos: RelatedTodoResponse[]) => (target: Todo) =>
  relatedTodos.find((tt) => tt.child_todo_id === target.id);

const asSource = (target: Todo) => ({
  key: target.id,
  label: target.title,
});

const asDestination = (target: Todo) => ({
  key: target.id,
  label: target.title,
});

const useData = (id: number, todos: Todo[]) => {
  const { isLoading, withLoading } = useLoading();
  const [data, setData] = useState<[TransferListItem[], TransferListItem[]]>([
    [],
    [],
  ]);

  useEffect(() => {
    withLoading(async () => {
      if (id) {
        const res = await TodoService.getTodo(id);

        if (res.related_todos.length === 0) {
          setData([todos.filter(notSelf(id)).map(asSource), []]);
          return;
        }

        setData([
          todos
            .filter(notSelf(id))
            .filter(notLinked(res.related_todos))
            .map(asSource),
          todos
            .filter(notSelf(id))
            .filter(linked(res.related_todos))
            .map(asDestination),
        ]);
      }
    });
  }, [id, todos, withLoading]);

  const handleLinkTodos = async (
    _: TransferListItem[],
    destination: TransferListItem[]
  ) => {
    withLoading(() =>
      TodoService.linkTodos(id, {
        // TODO: Setup backend generated enum
        relationship_type: 0,
        todo_ids: destination.map((d) => d.key),
      })
    );
  };

  return { isLoading, data, handleLinkTodos };
};

const TodoLinker: FC<TodoLinkerProps> = ({ todoId, allTodos }) => {
  const {
    data: [source, destination],
    handleLinkTodos,
    isLoading,
  } = useData(todoId, allTodos);

  return (
    <LoadArea loading={isLoading}>
      <Transfer
        className="max-h-screen"
        sourceTitle={i18n.get('Source')}
        sourceData={source}
        destinationTitle={i18n.get('Linked')}
        destinationData={destination}
        onValueChange={handleLinkTodos}
      />
    </LoadArea>
  );
};

export default TodoLinker;
