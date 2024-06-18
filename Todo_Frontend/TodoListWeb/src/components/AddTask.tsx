import React, { useState } from 'react';
import {
  AddTaskButton,
  TaskFormContainer,
  TaskInput,
  TaskForm,
  SubmitButton,
  CloseButton,
} from '../styles/AddTask.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TodoItem } from '../types/types';
import { formatDateToString } from '../common/CommonFunc';

interface AddTaskProps {
  handleFormSubmit: (task: TodoItem) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({ handleFormSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [isRotating, setIsRotating] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
    setIsRotating(true);
  };

  const handleCloseClick = () => {
    setShowForm(false);
    setName('');
    setDescription('');
    setIsRotating(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleFormSubmit({
      name,
      description,
      id: 0,
      dueDate: dueDate,
      status: '',
    });
    setShowForm(false);
    setName('');
    setDescription('');
    setDueDate(new Date());
    setIsRotating(false);
  };

  return (
    <div style={{ width: '50%', padding: '0 16px' }}>
      {showForm ? (
        <TaskFormContainer>
          <CloseButton onClick={handleCloseClick} isRotating={isRotating}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <TaskForm onSubmit={handleSubmit} isVisible={showForm}>
            <TaskInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Task Name"
              required
            />
            <TaskInput
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <TaskInput
              type="date"
              value={formatDateToString(dueDate)}
              onChange={(e) => setDueDate(new Date(e.target.value))}
              placeholder="Due Date"
              required
            />
            <SubmitButton type="submit">Add Task</SubmitButton>
          </TaskForm>
        </TaskFormContainer>
      ) : (
        <AddTaskButton onClick={handleButtonClick} isRotating={isRotating}>
          <FontAwesomeIcon icon={faPlus} />
        </AddTaskButton>
      )}
    </div>
  );
};

export default AddTask;
