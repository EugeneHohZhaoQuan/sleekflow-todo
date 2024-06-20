import styled, { keyframes } from 'styled-components';
const rotateIn = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
`;

const rotateOut = keyframes`
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const AddTaskButton = styled.button<{ isRotating: boolean }>`
  background: #007bff;
  border: none;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 8px;
  transition: all 0.3s ease;
  animation: ${(props) => (props.isRotating ? rotateIn : rotateOut)} 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

export const TaskFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const TaskInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const TaskForm = styled.form<{ isVisible: boolean }>`
  width: 100%;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  gap: 8px;
  animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 0.3s ease
    forwards;
`;

export const SubmitButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

export const CloseButton = styled.button<{ isRotating: boolean }>`
  background: #dc3545;
  border: none;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  margin: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${(props) => (props.isRotating ? rotateOut : rotateIn)} 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;
