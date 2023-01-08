import { FormDefinition, VirtualForm } from 'codefee-kit';
import { notEmptyString } from 'codefee-kit/dist/components/Form/validators';

import { useLoading } from 'hooks';

import { TodoService, UpdateTodoRequest } from 'generated';
import { useCallback } from 'react';

export const formDef: FormDefinition<UpdateTodoRequest> = {
  initialValue: {
    title: '',
    description: '',
    status: 0,
    tags: [],
  },
  rules: {
    title: notEmptyString,
  },
};

const useCreateTodoModel = () => {
  const { withLoading, isLoading } = useLoading();

  const handleSubmit = useCallback(
    (form: VirtualForm<UpdateTodoRequest>) => async () => {
      await withLoading(async () => {
        const res = await form.validate();

        if (res.isValid) {
          await TodoService.createTodo(form.value);
          form.reset();
        }
      });
    },
    [withLoading]
  );

  return { isLoading, handleSubmit };
};

export default useCreateTodoModel;
