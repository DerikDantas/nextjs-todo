import { produce } from 'immer';
import { create } from 'zustand';
import { ITodosStore } from './interface';

export const useTodosStore = create<ITodosStore>((set) => {
  const setState = (fn: (state: ITodosStore) => void) => set(produce(fn));

  return {
    todos: [],

    addTodo(newTodo) {
      setState((state) => {
        state.todos.push(newTodo);
      });
    },

    setTodos(newTodos) {
      setState((state) => {
        state.todos = newTodos;
      });
    }
  };
});
