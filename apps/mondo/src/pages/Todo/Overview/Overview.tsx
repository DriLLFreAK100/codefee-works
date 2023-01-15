import {
  Button,
  ConfirmDialog,
  Dialog,
  DialogHeader,
  LoadArea,
  Table,
  Typography,
} from 'codefee-kit';

import { TransferList } from 'ui';

import i18n from '@mondo/i18n';
import useTodoOverviewModel from './model';

const Overview = () => {
  const {
    isLoading,
    isOpenConfirmDelete,
    isOpenLink,
    todos,
    colDefs,
    handleClickCreate,
    handleCloseDeleteDialog,
    handleCloseLinkDialog,
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
        isOpen={isOpenConfirmDelete}
        onConfirm={handleDelete}
        onCancel={handleCloseDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        {i18n.get('Are you sure you want to delete this item?')}
      </ConfirmDialog>

      <Dialog isOpen={isOpenLink} isMandatory>
        <DialogHeader onClose={handleCloseLinkDialog}>
          {i18n.get('Todo Links')}
        </DialogHeader>

        <TransferList />
        <main>{i18n.get('Work In-Progress...')}</main>
      </Dialog>
    </>
  );
};

export default Overview;
