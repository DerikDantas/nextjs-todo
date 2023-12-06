import { useAuthContext } from '@/hooks/useAuthContext';
import { TodosService } from '@/services/';
import List from './components/List';

export default async function TodoList() {
  const { user } = useAuthContext();

  const { todos } = await TodosService.getTodos(user?._id ?? '');

  return <List data={todos} />;
}
