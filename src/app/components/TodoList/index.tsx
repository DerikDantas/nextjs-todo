import { todosRoute } from '../../../services/Todos';

const getTodos = async () => {
  try {
    const res = await fetch(todosRoute, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading todos: ', error);
  }
};

export default async function TodoList() {
  const { todos } = await getTodos();

  const handleDelete = async () => {};

  return (
    <div>
      {todos.map((item) => (
        <div key={item._id}>
          <p>{item.title}</p>
          <p>{item.description}</p>

          <button>Deletar</button>
        </div>
      ))}
    </div>
  );
}
