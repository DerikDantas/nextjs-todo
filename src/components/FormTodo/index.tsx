'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { ITodos } from '@/interfaces/Todos';
import { TodosService } from '@/services/';
import { Toast } from '@/shared-components';
import { Button, Input, TextArea } from '@/shared-components/';
import { useTodosStore } from '@/stores/todos';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Form, Switch } from 'react-aria-components';
import { FaArrowLeft } from 'react-icons/fa';
import schema from './Validation/schema';

interface IFormTodoProps {
  todo?: ITodos;
}

export default function FormTodo({ todo }: IFormTodoProps) {
  const { user } = useAuthContext();

  const route = useRouter();

  const todos = useTodosStore((state) => state.todos);
  const addTodo = useTodosStore((state) => state.addTodo);
  const setTodos = useTodosStore((state) => state.setTodos);

  const formik = useFormik({
    initialValues: {
      title: todo?.title ?? '',
      description: todo?.description ?? '',
      completed: todo?.completed ?? false
    },
    validateOnMount: false,
    validationSchema: schema,
    onSubmit: handleSubmit
  });

  async function handleSubmit() {
    const { title, description, completed } = formik.values;

    if (todo) {
      await TodosService.update(todo._id, {
        title,
        description,
        completed
      })
        .then((res) => {
          if (res.ok) {
            setTodos([
              ...todos.filter((item) => item._id !== todo._id),
              {
                ...todo,
                title,
                description,
                completed
              }
            ]);

            Toast.success('Successfully updated!');
            route.refresh();
            route.back();
          } else {
            Toast.error('Failed to updated a todo.');
          }
        })
        .catch((error) => console.log('Error: ' + error));
    } else {
      const userId = user?._id;

      await TodosService.add({
        title,
        description,
        userId,
        completed: false
      })
        .then(async (res) => {
          if (res.ok) {
            const { todo } = await res.json();
            addTodo(todo);
            Toast.success('Successfully updated!');
            formik.resetForm();
          } else {
            Toast.error('Failed to create a todo.');
          }
        })
        .catch((error) => console.log('Error: ' + error));
    }
  }

  return (
    <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      {todo && (
        <Button
          onPress={() => route.push('/dashboard')}
          className="flex items-center gap-2"
        >
          <FaArrowLeft />
          BACK
        </Button>
      )}
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

      <Switch
        className="group flex gap-2 items-center"
        onChange={(e) => formik.setFieldValue('completed', e)}
        isSelected={formik.values.completed}
      >
        <div className="flex h-[26px] w-[44px] shrink-0  rounded-full shadow-inner bg-clip-padding border border-solid border-white/30 p-[3px] box-border transition duration-200 ease-in-out bg-gray-600 group-pressed:bg-yellow-700 group-selected:bg-green-800 group-selected:group-pressed:bg-green-900 outline-none group-focus-visible:ring-2 ring-black cursor-pointer">
          <span className="h-[18px] w-[18px] transform rounded-full bg-white shadow transition duration-200 ease-in-out translate-x-0 group-selected:translate-x-[100%]" />
        </div>
        Completed
      </Switch>

      <Button type="submit">{todo ? 'UPDATE' : 'CREATE'}</Button>
    </Form>
  );
}
