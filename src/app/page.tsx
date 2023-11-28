import { Suspense } from 'react';
import TodoList from './components/TodoList';

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
    </main>
  );
}
