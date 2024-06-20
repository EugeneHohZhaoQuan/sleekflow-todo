// TodoItem.tsx
import React, { useState } from 'react';
import { TodoItem as TodoItemType } from '../types/types';
import {
  Button,
  CancelButton,
  EditButton,
  StatusBadge,
  TodoItemContainer,
  DeleteButton,
  ButtonContainer,
  TaskContainer,
  TaskTitle,
  TaskDescription,
  TaskDate,
  InputContainer,
} from '../styles/TodoItem.styles';
import { formatDateToString } from '../common/CommonFunc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoItemProps {
  todo: TodoItemType;
  updateTask: (id: number, updatedTodo: TodoItemType) => void;
  deleteTask: (id: number) => void;
  formatDate: (date: string) => string;
}

export const TodoTask: React.FC<TodoItemProps> = ({
  todo,
  updateTask,
  deleteTask,
  formatDate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTodo, setEditableTodo] = useState({ ...todo });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditableTodo({ ...todo });
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditableTodo({ ...editableTodo, [name]: value });
  };

  const handleUpdateClick = () => {
    updateTask(todo.id, editableTodo);
    setIsEditing(false);
  };

  return (
    <TodoItemContainer>
      {isEditing ? (
        <>
          <ButtonContainer>
            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
            <Button onClick={handleUpdateClick}>Update</Button>
          </ButtonContainer>
          <InputContainer>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={editableTodo.name}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <label>Description :</label>
            <input
              type="text"
              name="description"
              value={editableTodo.description}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <label>Due date :</label>
            <input
              type="date"
              name="dueDate"
              value={formatDateToString(new Date(editableTodo.dueDate))}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <label>Status :</label>
            <select
              name="status"
              value={editableTodo.status}
              onChange={handleInputChange}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </InputContainer>
        </>
      ) : (
        <>
          {/* <StatusBadge status={todo.status}>{todo.status}</StatusBadge> */}

          <ButtonContainer>
            <EditButton onClick={handleEditClick}>
              <FontAwesomeIcon icon={faCog} />
            </EditButton>
            <DeleteButton onClick={() => deleteTask(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          </ButtonContainer>
          <TaskContainer>
            <TaskTitle>{todo.name}</TaskTitle>
            <TaskDescription>{todo.description}</TaskDescription>
            <TaskDate>{formatDate(todo.dueDate.toString())}</TaskDate>
          </TaskContainer>
        </>
      )}
    </TodoItemContainer>
  );
};

export default TodoTask;
