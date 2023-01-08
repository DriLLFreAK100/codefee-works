import { Button, LoadArea, Table, Typography } from 'codefee-kit';

import i18n from 'i18n/i18n';
import useTodoOverviewModel, { colDefs } from './model';

const Overview = () => {
  const { isLoading, todos, handleClickCreate } = useTodoOverviewModel();

  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography type="h4">{i18n.get('Overview')}</Typography>
        <Button onClick={handleClickCreate}>{i18n.get('+ Add Item')}</Button>
      </div>
      <LoadArea loading={isLoading}>
        <Table data={todos} colDefs={colDefs} />
      </LoadArea>
    </>
  );
};

export default Overview;
