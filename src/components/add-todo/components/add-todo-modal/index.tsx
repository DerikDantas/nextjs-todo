import { Button, Modal } from '@/shared-components';
import { useState } from 'react';
import FormTodo from '../../../form-todo';

export default function AddTodoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-1/4">
        <Button onPress={() => setIsOpen((prev) => !prev)}>Add Todo</Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        heading="Add Todo"
        content={<FormTodo />}
      />
    </>
  );
}
