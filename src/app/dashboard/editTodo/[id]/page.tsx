import FormTodo from '@/components/FormTodo';
import { TodosService } from '@/services/';

interface IEditTodoProps {
  params: { id: string };
}

export default async function EditTodo({ params }: IEditTodoProps) {
  const { id } = params;
  const { todo } = await TodosService.getById(id);

  return <FormTodo todo={todo} />;
}
