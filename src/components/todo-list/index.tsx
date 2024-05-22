import Loading from '@/app/loading';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useTodosQueries } from '@/queries/todos';
import { Text } from 'react-aria-components';
import List from './components/list';

export default async function TodoList() {
  const { user } = useAuthContext();

  const { useGetTodos } = useTodosQueries();
  const { data, isLoading, isError } = useGetTodos(user?._id ?? '');

  if (isLoading) return <Loading />;

  if (isError) return <Text color="red">Error to fetch todos</Text>;

  return <List data={data?.todos ?? []} />;
}
