import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { todoApi } from '../api/todoApi';
import { FilterOptions, SortOptions, TodoItem } from '../types/types';
import {
  Button,
  Column,
  ColumnTitle,
  TaskBoardContainer,
  TodoItemContainer,
  TodoContainer,
  TaskContainer,
} from '../styles/TodoList.styles';

import FilterSort from '../components/FilterSort';
import AddTask from '../components/AddTask';
import { formatDate, generateNumericID } from '../common/CommonFunc';
import TodoTask from '../components/TodoItem';

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

  useEffect(() => {
    fetchTodos();
  }, [filterOptions, sortOptions]);

  const fetchTodos = async () => {
    try {
      const todoItems = await getTodoItems(filterOptions, sortOptions);
      setTodos(todoItems);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTask = async (id: number) => {
    await deleteTodoApi(id);
    fetchTodos();
  };

  const handleFormSubmit = async (task: TodoItem) => {
    const newTask: TodoItem = {
      id: generateNumericID(),
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      status: 'Not Started',
    };

    await postTodoApi(newTask);
    fetchTodos();
  };

  const updateTask = async (id: number, todo: TodoItem) => {
    const updatedTask = {
      ...todo,
      dueDate: new Date(todo.dueDate),
    };

    await updateTodoApi(id, updatedTask);
    fetchTodos();
  };

  const renderTasks = (status: string) =>
    todos
      .filter((todo) => todo.status === status)
      .map((todo) => (
        <TodoTask
          key={todo.id}
          todo={todo}
          updateTask={updateTask}
          deleteTask={deleteTask}
          formatDate={formatDate}
        />
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
          {(filterOptions.status === 'all' ||
            filterOptions.status === 'Not Started') && (
            <Column>
              <ColumnTitle status="Not Started">Not Started</ColumnTitle>
              <TaskContainer>{renderTasks('Not Started')}</TaskContainer>
            </Column>
          )}
          {(filterOptions.status === 'all' ||
            filterOptions.status === 'In Progress') && (
            <Column>
              <ColumnTitle status="In Progress">In Progress</ColumnTitle>
              <TaskContainer>{renderTasks('In Progress')}</TaskContainer>
            </Column>
          )}
          {(filterOptions.status === 'all' ||
            filterOptions.status === 'Complete') && (
            <Column>
              <ColumnTitle status="Completed">Completed</ColumnTitle>
              <TaskContainer>{renderTasks('Complete')}</TaskContainer>
            </Column>
          )}
        </TaskBoardContainer>
      </>
    </TodoContainer>
  );
};

export default TodoList;
