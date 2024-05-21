'use client';

import AddTodo from '@/components/add-todo';
import TodoList from '@/components/todo-list';
import { useAuthContext } from '@/hooks/use-auth-context';
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
