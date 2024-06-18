import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { todoApi } from '../api/getTodoApi';
import { FilterOptions, SortOptions, TodoItem } from '../types/types';
import {
  Button,
  Column,
  ColumnTitle,
  TaskBoardContainer,
  TodoItemContainer,
  TodoContainer,
} from '../styles/TodoList.styles';

import FilterSort from './FilterSort';
import AddTask from './AddTask';
import { formatDate, generateNumericID } from '../common/CommonFunc';

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

  const handleCheckboxChange = async (todo: TodoItem) => {
    const updatedTask = {
      ...todo,
      status: 'Complete',
    };

    await updateTodoApi(todo.id, updatedTask);
    fetchTodos();
  };

  const updateTask = async (id: number, todo: TodoItem) => {
    const updatedTask = {
      ...todo,
      status: todo.status === 'Not Started' ? 'In Progress' : 'Complete',
    };

    await updateTodoApi(todo.id, updatedTask);
    fetchTodos();
  };

  const renderTasks = (status: string) =>
    todos
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
          <div>{formatDate(todo.dueDate.toString())}</div>
          {todo.status !== 'Complete' && (
            <Button
              style={{ backgroundColor: '#448361' }}
              onClick={() => updateTask(todo.id, todo)}
            >
              Update
            </Button>
          )}
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
          {(filterOptions.status === 'all' ||
            filterOptions.status === 'Not Started') && (
            <Column>
              <ColumnTitle>Not Started</ColumnTitle>
              {renderTasks('Not Started')}
            </Column>
          )}
          {(filterOptions.status === 'all' ||
            filterOptions.status === 'In Progress') && (
            <Column>
              <ColumnTitle>In Progress</ColumnTitle>
              {renderTasks('In Progress')}
            </Column>
          )}
          {(filterOptions.status === 'all' ||
            filterOptions.status === 'Complete') && (
            <Column>
              <ColumnTitle>Completed</ColumnTitle>
              {renderTasks('Complete')}
            </Column>
          )}
        </TaskBoardContainer>
      </>
    </TodoContainer>
  );
};

export default TodoList;
