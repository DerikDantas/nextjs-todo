'use client';

import { redirect } from 'next/navigation';
import AddTodo from '../../components/AddTodo';
import TodoList from '../../components/TodoList';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Dashboard() {
  const { user } = useAuthContext();

  if (!user) redirect('/login');

  return (
    <div className="w-full">
      <AddTodo />

      <TodoList />
    </div>
  );
}
