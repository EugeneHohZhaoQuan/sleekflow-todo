// src/api/getTodoApi.ts
import axios from 'axios';
import { TodoItem } from '../types/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5252/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getTodoItems = async (): Promise<TodoItem[]> => {
  const response = await axiosInstance.get('/todo');
  return response.data;
};

const postTodoApi = async (todoItem: TodoItem) => {
  try {
    const response = await axiosInstance.post('/todo', todoItem);
    return response.data;
  } catch (error) {
    console.error('Error posting todo item', error);
    throw error;
  }
};

const deleteTodoApi = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/todo/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const todoApi = {
  getTodoItems,
  postTodoApi,
  deleteTodoApi,
};
