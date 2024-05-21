import { useAuthContext } from '@/hooks/use-auth-context';
import { TodosService } from '@/services/';
import List from './components/list';

export default async function TodoList() {
  const { user } = useAuthContext();

  const { todos } = await TodosService.getTodos(user?._id ?? '');

  return <List data={todos} />;
}
