// src/api/getTodoApi.ts
import axios from 'axios';
import { FilterOptions, SortOptions, TodoItem } from '../types/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5252/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getTodoItems = async (
  filterOptions: FilterOptions,
  sortOptions: SortOptions,
): Promise<TodoItem[]> => {
  const { status, dueDate } = filterOptions;
  const { sortBy, order } = sortOptions;
  const ascending = order === 'asc';

  const dueDateUtc = dueDate ? new Date(dueDate).toISOString() : '';

  const response = await axiosInstance.get('/todo', {
    params: {
      status,
      dueDate: dueDateUtc,
      sortBy,
      ascending,
    },
  });

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

const updateTodoApi = async (id: number, todoItem: TodoItem) => {
  try {
    const response = await axiosInstance.put(`/todo/${id}`, todoItem);

    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const todoApi = {
  getTodoItems,
  postTodoApi,
  deleteTodoApi,
  updateTodoApi,
};
