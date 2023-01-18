import {
  Button,
  ConfirmDialog,
  Dialog,
  DialogHeader,
  LoadArea,
  Table,
  Typography,
} from 'codefee-kit';
import ReactMarkdown from 'react-markdown';

import i18n from '@mondo/i18n';
import useTodoOverviewModel from './model';
import TodoLinker from './TodoLinker';

const Overview = () => {
  const {
    isLoading,
    target,
    todos,
    colDefs,
    isPerformAction,
    handleClickCreate,
    handleCloseDialog,
    handleDelete,
  } = useTodoOverviewModel();

  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography type="h4">{i18n.get('Overview')}</Typography>
        <Button onClick={handleClickCreate}>{i18n.get('+ Add Item')}</Button>
      </div>
      <LoadArea loading={isLoading}>
        <Table data={todos} colDefs={colDefs} />
      </LoadArea>

      <ConfirmDialog
        isOpen={isPerformAction('delete')}
        onConfirm={handleDelete}
        onCancel={handleCloseDialog}
        onClose={handleCloseDialog}
      >
        {i18n.get('Are you sure you want to delete this item?')}
      </ConfirmDialog>

      <Dialog isOpen={isPerformAction('link')} isMandatory>
        <DialogHeader onClose={handleCloseDialog}>
          {i18n.get('Todo Links')}
        </DialogHeader>
        <TodoLinker todoId={target?.id!} allTodos={todos} />
      </Dialog>

      <Dialog isOpen={isPerformAction('view')}>
        <DialogHeader onClose={handleCloseDialog}>
          {target?.title || ''}
        </DialogHeader>
        <ReactMarkdown className="markdown px-2">
          {target?.description || ''}
        </ReactMarkdown>
      </Dialog>
    </>
  );
};

export default Overview;
