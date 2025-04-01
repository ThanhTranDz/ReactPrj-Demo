import { createSlice } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  todos: loadFromLocalStorage(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t: Todo) => t.id === id);
      if (todo) {
        todo.text = text;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t: Todo) => t.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((t: Todo) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    moveTodo: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.todos.splice(oldIndex, 1);
      state.todos.splice(newIndex, 0, removed);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodo, moveTodo } = todoSlice.actions;
export default todoSlice.reducer;