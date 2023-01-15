import { FC } from 'react';

import { TransferList } from 'ui';

import i18n from '@mondo/i18n';
import { Todo } from '@mondo/generated';

type TodoLinkerProps = {
  todoId: number;
  allTodos: Todo[];
};

const TodoLinker: FC<TodoLinkerProps> = () => {
  // const effectiveTodos = allTodos.filter((a) => a.id !== todoId);

  return (
    <TransferList
      sourceTitle={i18n.get('Source')}
      sourceData={[]}
      destinationTitle={i18n.get('Linked')}
      destinationData={[]}
    />
  );
};

export default TodoLinker;
