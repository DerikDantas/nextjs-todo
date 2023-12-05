import { Text } from 'react-aria-components';
import AddModal from './components/AddModal';

export default function AddTodo() {
  return (
    <div className="flex items-center justify-between">
      <Text elementType="h1">TODOS APP</Text>

      <AddModal />
    </div>
  );
}
