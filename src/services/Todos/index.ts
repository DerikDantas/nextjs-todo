import { ITodos } from '@/interfaces/Todos';
import { todosRoute } from '../../constants/routes';

export class TodosService {
  static async getTodos(userId: string): Promise<{ todos: ITodos[] }> {
    return fetch(todosRoute + `?userId=${userId}`, {
      cache: 'no-store'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }

        return res.json();
      })
      .catch((error) => console.log('Error loading todos: ', error));
  }

  static async getById(id: string): Promise<ITodos> {
    return fetch(todosRoute + `/${id}`, {
      cache: 'no-store'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }

        return res.json();
      })
      .catch((error) => console.log('Error loading todo: ', error));
  }

  static async add(newTodo: Omit<ITodos, '_id'>) {
    return fetch(todosRoute, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });
  }

  static async update(id: string, todo: Omit<ITodos, '_id' | 'userId'>) {
    return fetch(todosRoute + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
  }

  static async delete(id: string) {
    return fetch(todosRoute + `?id=${id}`, {
      method: 'DELETE'
    });
  }
}
