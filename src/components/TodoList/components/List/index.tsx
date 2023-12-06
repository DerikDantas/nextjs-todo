'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Text } from 'react-aria-components';
import { IoMdTrash } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';
import { ITodos } from '../../../../interfaces/Todos';
import { todosRoute } from '../../../../services/Todos';
import { useTodosStore } from '../../../../stores/todos';

interface IListProps {
  data: ITodos[];
}

export default function List({ data }: IListProps) {
  const todos = useTodosStore((state) => state.todos);
  const setTodos = useTodosStore((state) => state.setTodos);

  const router = useRouter();

  useEffect(() => {
    if (data) setTodos(data);
  }, [data, setTodos]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      const res = await fetch(todosRoute + `?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setTodos(todos.filter((item) => item._id !== id));
      }
    }
  };

  if (todos.length === 0) {
    return (
      <div className="flex justify-center items-center my-4">
        <Text className="font-bold text-xl">No Todos.</Text>
      </div>
    );
  }

  return (
    <div className="my-4">
      {todos?.map((item) => (
        <div
          key={item._id}
          className={classNames(
            'p-4 my-3 flex justify-between gap-5 items-center rounded border-2',
            item.completed ? 'border-green-500' : 'border-red-500'
          )}
        >
          <div className="flex flex-col">
            <Text className="font-bold text-base">{item.title}</Text>
            <Text className="text-sm">{item.description}</Text>
          </div>

          <div className="flex gap-2">
            <button onClick={() => router.push(`/editTodo/${item._id}`)}>
              <MdOutlineEdit size={24} />
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDelete(item._id)}
            >
              <IoMdTrash size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
