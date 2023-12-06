import { useState } from 'react';
import { Button, Modal } from '../../../../shared-components';
import FormTodo from '../../../FormTodo';

export default function AddModal() {
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
