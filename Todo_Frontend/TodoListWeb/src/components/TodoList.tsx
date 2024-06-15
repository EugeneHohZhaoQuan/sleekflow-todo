// src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { todoApi } from '../api/getTodoApi';
import { TodoItem } from '../types/types';
import {
  TodoItemContainer,
  TodoListContainer,
} from '../styles/TodoList.styles';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [task, setTask] = useState('');

  const { getTodoItems, postTodoApi, deleteTodoApi } = todoApi;

  const fetchTodos = async () => {
    try {
      const todoItems = await getTodoItems();
      setTodos(todoItems);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // const toggleComplete = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
  //     ),
  //   );
  // };

  const deleteTask = async (id: number) => {
    const response = await deleteTodoApi(id);

    fetchTodos();
  };

  const generateNumericID = (): number => {
    const uuid = uuidv4();
    const numericId = parseInt(uuid.split('-').join('').slice(0, 15), 16); // Convert part of the UUID to a number
    return numericId;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission

    const newTask: TodoItem = {
      id: generateNumericID(),
      name: task,
      description: task,
      dueDate: new Date(),
      status: 'Inporgress',
    };

    const response = await postTodoApi(newTask);

    fetchTodos();
  };

  const handleInputChange = (e: any) => {
    setTask(e.target.value);
  };

  return (
    <TodoListContainer>
      <form onSubmit={handleFormSubmit}>
        <input value={task} onChange={handleInputChange} />
        <button type="submit">Add Task</button>
      </form>
      {todos.map((todo) => (
        <TodoItemContainer>
          <div>{todo.name}</div>
          <div>{todo.description}</div>
          <div>{todo.status}</div>
          <button onClick={() => deleteTask(todo.id)}>Delete</button>
        </TodoItemContainer>
      ))}
    </TodoListContainer>
  );
};

export default TodoList;
