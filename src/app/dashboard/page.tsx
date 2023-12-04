'use client';

import { useFormik } from 'formik';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../hooks/useAuthContext';
import { todosRoute } from '../../services/Todos';
import { ToastError } from '../components/ToastError';
import TodoList from '../components/TodoList';

export default function Dashboard() {
  const { user } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: handleSubmit
  });

  async function handleSubmit() {
    const { title, description } = formik.values;
    try {
      const res = await fetch(todosRoute, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });

      if (res.ok) {
        toast.success('Successfully created!');
      } else {
        ToastError('Failed to create a todo.');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  if (!user) redirect('/login');

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          rows={10}
          placeholder="Description"
        />

        <button type="submit">CREATE</button>
      </form>

      <TodoList />
    </>
  );
}
