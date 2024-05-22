import { TodosService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useTodosQueries = () => {
  function useGetTodos(id: string) {
    return useQuery({
      queryKey: ['getTodos'],
      queryFn: () => TodosService.getTodos(id)
    });
  }

  return { useGetTodos };
};
