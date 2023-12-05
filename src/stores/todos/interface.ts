import { ITodos } from '../../interfaces/Todos';

export interface ITodosStore {
  todos: ITodos[];
  addTodo: (todo: ITodos) => void;
  setTodos: (todos: ITodos[]) => void;
}
