import { useFormik } from 'formik';
import { Form } from 'react-aria-components';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { todosRoute } from '../../../../services/Todos';
import { Button, Input, Modal, TextArea } from '../../../../shared-components';
import { useTodosStore } from '../../../../stores/todos';
import { ToastError } from '../../../ToastError';
import schema from './Validation/schema';

export default function AddModal() {
  const { user } = useAuthContext();

  const addTodos = useTodosStore((state) => state.addTodo);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: schema,
    onSubmit: handleSubmit
  });

  async function handleSubmit() {
    const { title, description } = formik.values;
    const userId = user._id;

    try {
      const res = await fetch(todosRoute, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, description, userId, completed: false })
      });

      if (res.ok) {
        const { todo } = await res.json();

        toast.success('Successfully created!');
        addTodos(todo);
        formik.resetForm();
      } else {
        ToastError('Failed to create a todo.');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  return (
    <Modal
      heading="Add Todo"
      trigger={
        <div className="w-1/4">
          <Button>Add Todo</Button>
        </div>
      }
      content={
        <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          <Input
            label="Title"
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : undefined
            }
          />
          <TextArea
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={3}
            required
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : undefined
            }
          />

          <Button type="submit">CREATE</Button>
        </Form>
      }
    />
  );
}
