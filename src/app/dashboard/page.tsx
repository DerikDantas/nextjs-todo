'use client';

import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { useAuthContext } from '@/hooks/useAuthContext';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { user } = useAuthContext();

  if (!user) redirect('/login');

  return (
    <main className="w-full">
      <AddTodo />

      <TodoList />
    </main>
  );
}
