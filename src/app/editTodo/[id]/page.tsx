import FormTodo from '../../../components/FormTodo';
import { todosRoute } from '../../../services/Todos';

const getTodoById = async (id: string) => {
  try {
    const res = await fetch(todosRoute + `/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch todo');
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

interface IEditTodoProps {
  params: { id: string };
}

export default async function EditTodo({ params }: IEditTodoProps) {
  const { id } = params;
  const { todo } = await getTodoById(id);

  return <FormTodo todo={todo} />;
}
