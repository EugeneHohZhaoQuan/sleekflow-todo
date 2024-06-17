// src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { todoApi } from '../api/getTodoApi';
import { TodoItem } from '../types/types';
import {
  Button,
  Checkbox,
  Column,
  ColumnTitle,
  TaskBoardContainer,
  TodoItemContainer,
  TodoContainer,
} from '../styles/TodoList.styles';

import FilterSort from './FilterSort';
import AddTask from './AddTask';

interface FilterOptions {
  status: string;
  dueDate: string;
}

interface SortOptions {
  sortBy: string;
  order: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all',
    dueDate: '',
  });

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'due-date',
    order: 'asc',
  });

  const { getTodoItems, postTodoApi, deleteTodoApi, updateTodoApi } = todoApi;

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

  const deleteTask = async (id: number) => {
    const response = await deleteTodoApi(id);

    fetchTodos();
  };

  const generateNumericID = (): number => {
    const uuid = uuidv4();
    const numericId = parseInt(uuid.split('-').join('').slice(0, 15), 16); // Convert part of the UUID to a number
    return numericId;
  };

  const handleFormSubmit = async (task: TodoItem) => {
    const newTask: TodoItem = {
      id: generateNumericID(),
      name: task.name,
      description: task.description,
      dueDate: new Date(),
      status: 'Not Started',
    };

    const response = await postTodoApi(newTask);

    fetchTodos();
  };

  const handleCheckboxChange = async (todo: TodoItem) => {
    const updatedTask = {
      ...todo,
      status: 'Complete',
    };

    const response = await updateTodoApi(todo.id, updatedTask);

    fetchTodos();
  };

  const applyFilterAndSort = (todos: TodoItem[]) => {
    let filteredTodos = todos;

    // Apply filter
    if (filterOptions.status !== 'all') {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.status === filterOptions.status,
      );
    }
    if (filterOptions.dueDate) {
      filteredTodos = filteredTodos.filter(
        (todo) =>
          new Date(todo.dueDate).toDateString() ===
          new Date(filterOptions.dueDate).toDateString(),
      );
    }

    // Apply sort
    filteredTodos.sort((a, b) => {
      if (sortOptions.sortBy === 'due-date') {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortOptions.order === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortOptions.sortBy === 'name') {
        return sortOptions.order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return filteredTodos;
  };

  const renderTasks = (status: string) =>
    applyFilterAndSort(todos)
      .filter((todo) => todo.status === status)
      .map((todo) => (
        <TodoItemContainer key={todo.id}>
          <div>
            {/* <Checkbox
            type="checkbox"
            onChange={() => handleCheckboxChange(todo)}
            checked={todo.status === 'Complete'}
          /> */}
            <span>{todo.name}</span>
          </div>
          <div>{todo.description}</div>
          <Button onClick={() => deleteTask(todo.id)}>Delete</Button>
        </TodoItemContainer>
      ));

  return (
    <TodoContainer>
      <div style={{ display: 'flex' }}>
        <AddTask handleFormSubmit={handleFormSubmit} />
        <FilterSort
          onFilterChange={setFilterOptions}
          onSortChange={setSortOptions}
        />
      </div>
      <>
        <TaskBoardContainer>
          <Column>
            <ColumnTitle>Not Started</ColumnTitle>
            {renderTasks('Not Started')}
          </Column>
          <Column>
            <ColumnTitle>In Progress</ColumnTitle>
            {renderTasks('In Progress')}
          </Column>
          <Column>
            <ColumnTitle>Complete</ColumnTitle>
            {renderTasks('Complete')}
          </Column>
        </TaskBoardContainer>
      </>
    </TodoContainer>
  );
};

export default TodoList;
