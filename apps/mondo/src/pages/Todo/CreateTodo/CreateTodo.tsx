import {
  Button,
  Input,
  Form,
  TextArea,
  Typography,
  VirtualForm,
  LoadArea,
} from 'codefee-kit';

import { UpdateTodoRequest } from 'generated';
import i18n from 'i18n/i18n';
import useCreateTodoModel, { formDef } from './model';

const CreateTodo = () => {
  const { isLoading, handleSubmit } = useCreateTodoModel();

  return (
    <>
      <Typography type="h4" className="pb-2">
        {i18n.get('Create Todo')}
      </Typography>

      <LoadArea loading={isLoading}>
        <Form
          className="[&>:not(last-child)]:mb-3"
          formDef={formDef}
          render={(form: VirtualForm<UpdateTodoRequest>) => {
            return (
              <>
                <Input
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
                  label={i18n.get('Tags')}
                  value={form.value.tags}
                  onChange={(e) =>
                    form.setValue({
                      ...form.value,
                      tags: e.target.value.split(';'),
                    })
                  }
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={handleSubmit(form)}>
                    {i18n.get('Create')}
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

export default CreateTodo;
