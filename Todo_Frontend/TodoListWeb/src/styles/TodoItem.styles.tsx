import styled from 'styled-components';

export const TodoItemContainer = styled.div`
  background: #fff;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;

  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 5px;
  ${(props) =>
    props.status === 'Not Started'
      ? 'background-color: #ffcc00;'
      : props.status === 'In Progress'
      ? 'background-color: #00aaff;'
      : 'background-color: #4caf50;'}
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const DeleteButton = styled(Button)``;

export const EditButton = styled(Button)`
  background-color: #ffa500;

  &:hover {
    background-color: #e69500;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #ff0000;

  &:hover {
    background-color: #cc0000;
  }
`;

export const TaskContainer = styled.div`
  display: grid;
  gap: 10px;
`;

export const TaskTitle = styled.span`
  font-size: x-large;
  color: #2c3e50;
  font-weight: 500;
`;

export const TaskDescription = styled.span`
  color: #7f8c8d;
  font-weight: 300;
`;

export const TaskDate = styled.span`
  color: #aab7b8;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  input,
  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #f9f9f9;
    &:focus {
      outline: none;
      border-color: #a0a0a0;
    }
  }
`;
