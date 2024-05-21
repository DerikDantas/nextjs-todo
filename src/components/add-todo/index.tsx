import { Text } from 'react-aria-components';
import AddTodoModal from './components/add-todo-modal';

export default function AddTodo() {
  return (
    <div className="flex items-center justify-between">
      <Text elementType="h1">TODOS APP</Text>

      <AddTodoModal />
    </div>
  );
}
