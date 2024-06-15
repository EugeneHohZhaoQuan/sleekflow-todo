// src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';

import { todoApi } from '../api/getTodoApi';
import { TodoItem } from '../types/types';
import {
  TodoItemContainer,
  TodoListContainer,
} from '../styles/TodoList.styles';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const { getTodoItems } = todoApi;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoItems = await getTodoItems();
        setTodos(todoItems);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // const toggleComplete = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
  //     ),
  //   );
  // };

  // const deleteTodo = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  return (
    <TodoListContainer>
      <form>
        <input></input>
        <button>Add Task</button>
      </form>
      {todos.map((todo) => (
        <TodoItemContainer>
          <div>{todo.name}</div>
          <div>{todo.description}</div>
          <div>{todo.status}</div>
        </TodoItemContainer>
      ))}
    </TodoListContainer>
  );
};

export default TodoList;
