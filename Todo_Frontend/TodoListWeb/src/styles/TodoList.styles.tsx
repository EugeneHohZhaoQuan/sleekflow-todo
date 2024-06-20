import styled from 'styled-components';

export const TaskBoardContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const Column = styled.div`
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ColumnTitle = styled.h2<{ status: string }>`
  letter-spacing: -1px;
  margin: 0;
  padding-bottom: 16px;
  text-transform: uppercase;
  ${(props) =>
    props.status === 'Not Started'
      ? 'border-bottom: 2px solid #ffcc00;'
      : props.status === 'In Progress'
      ? 'border-bottom: 2px solid #00aaff;'
      : 'border-bottom: 2px solid #4caf50;'}
`;

export const TodoItemContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Checkbox = styled.input`
  margin-right: 8px;
`;

export const Button = styled.button`
  align-self: flex-end;
  background: #ff4d4d;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 8px 12px;

  &:hover {
    background: #ff1a1a;
  }
`;

export const TodoContainer = styled.div`
  margin-top: 16px;
`;

export const TaskContainer = styled.div`
  border-radius: 8px;
  background: #f3f7fd;
  padding: 5px;
  gap: 10px;
  display: grid;
`;
