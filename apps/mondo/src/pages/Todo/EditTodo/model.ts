import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FormDefinition, VirtualForm } from 'codefee-kit';
import { notEmptyString } from 'codefee-kit/dist/components/Form/validators';

import { useLoadable, useLoading } from 'hooks';

import { Todo, TodoService, UpdateTodoRequest } from '@mondo/generated';
import i18n from '@mondo/i18n';

export const makeFormDef = (
  data?: Todo
): FormDefinition<UpdateTodoRequest> => ({
  initialValue: data || {
    title: '',
    description: '',
    status: 0,
    tags: [],
  },
  rules: {
    title: notEmptyString,
  },
});

type OpsType = 'create' | 'edit';

const pageTitle: Record<OpsType, string> = {
  create: i18n.get('Create Todo'),
  edit: i18n.get('Edit Todo'),
};

const actionTitle: Record<OpsType, string> = {
  create: i18n.get('Create'),
  edit: i18n.get('Save'),
};

const useEditTodoModel = () => {
  const { id } = useParams();
  const opsType: OpsType = id ? 'edit' : 'create';

  const { withLoading, isLoading } = useLoading();
  const {
    data,
    isLoading: isFetchingData,
    mutate,
  } = useLoadable(() => (id ? TodoService.getTodo(Number(id)) : undefined), {
    deps: [id],
  });

  const handleSubmit = useCallback(
    (form: VirtualForm<UpdateTodoRequest>) => async () => {
      await withLoading(async () => {
        const res = await form.validate();

        if (res.isValid) {
          const data =
            opsType === 'create'
              ? await TodoService.createTodo(form.value)
              : await TodoService.updateTodo(Number(id), form.value);

          mutate(data);
          form.reset();
        }
      });
    },
    [id, mutate, opsType, withLoading]
  );

  const formDef = useMemo(() => makeFormDef(data), [data]);

  return {
    pageTitle: pageTitle[opsType],
    actionTitle: actionTitle[opsType],
    formDef,
    isLoading: isLoading || isFetchingData,
    handleSubmit,
  };
};

export default useEditTodoModel;
