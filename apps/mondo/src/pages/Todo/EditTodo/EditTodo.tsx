import {
  Button,
  Input,
  Form,
  TextArea,
  Typography,
  VirtualForm,
  LoadArea,
} from 'codefee-kit';

import { UpdateTodoRequest } from '@mondo/generated';
import i18n from '@mondo/i18n';
import useEditTodoModel from './model';

const EditTodo = () => {
  const { pageTitle, actionTitle, isLoading, formDef, handleSubmit } =
    useEditTodoModel();

  return (
    <>
      <Typography type="h4" className="pb-2">
        {pageTitle}
      </Typography>

      <LoadArea loading={isLoading}>
        <Form
          className="[&>:not(last-child)]:mb-3"
          formDef={formDef}
          render={(form: VirtualForm<UpdateTodoRequest>) => {
            return (
              <>
                <Input
                  className="w-full"
                  label={i18n.get('Title')}
                  error={form.hasError('title')}
                  value={form.value.title}
                  onChange={(e) =>
                    form.setValue({ ...form.value, title: e.target.value })
                  }
                />
                <TextArea
                  className="w-full"
                  label={i18n.get('Description')}
                  value={form.value.description}
                  onChange={(e) =>
                    form.setValue({
                      ...form.value,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  className="w-full"
                  label={i18n.get('Tags')}
                  value={form.value.tags?.join(';')}
                  onChange={(e) =>
                    form.setValue({
                      ...form.value,
                      tags: e.target.value.split(';'),
                    })
                  }
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={handleSubmit(form)}>
                    {actionTitle}
                  </Button>
                </div>
              </>
            );
          }}
        />
      </LoadArea>
    </>
  );
};

export default EditTodo;
