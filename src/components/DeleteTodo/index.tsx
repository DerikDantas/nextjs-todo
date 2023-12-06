import { TodosService } from '@/services/';
import { useTodosStore } from '@/stores/todos';
import { IoMdTrash } from 'react-icons/io';

interface IDeleteTodoProps {
  id: string;
}

export default function DeleteTodo({ id }: IDeleteTodoProps) {
  const todos = useTodosStore((state) => state.todos);
  const setTodos = useTodosStore((state) => state.setTodos);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      const res = await TodosService.delete(id);

      if (res.ok) {
        setTodos(todos.filter((item) => item._id !== id));
      }
    }
  };

  return (
    <button className="text-red-500" onClick={() => handleDelete(id)}>
      <IoMdTrash size={24} />
    </button>
  );
}
