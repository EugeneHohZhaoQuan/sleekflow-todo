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

export const todoApi = {
  getTodoItems,
};
