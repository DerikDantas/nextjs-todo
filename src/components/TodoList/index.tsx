import { useAuthContext } from '../../hooks/useAuthContext';
import { ITodos } from '../../interfaces/Todos';
import { todosRoute } from '../../services/Todos';
import List from './components/List';

const getTodos = async (userId: string): Promise<{ todos: ITodos[] }> => {
  try {
    const res = await fetch(todosRoute + `?userId=${userId}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading todos: ', error);
  }
};

export default async function TodoList() {
  const { user } = useAuthContext();

  const { todos } = await getTodos(user?._id);

  return <List data={todos} />;
}
