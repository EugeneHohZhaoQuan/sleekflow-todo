import styled from 'styled-components';

export const DropdownContainer = styled.div<{ isVisible: boolean }>`
  position: relative;
  display: inline-block;
  margin: 0 8px;

  & > div {
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 10px;
    border-radius: 4px;
    width: 200px; // Adjusted width for better spacing
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & > label {
    margin-bottom: 5px;
  }

  & > input,
  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const Button = styled.button`
  background: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

export const SubmitButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #218838;
  }
`;

export const CloseButton = styled.button`
  background: #dc3545;
  border: none;
  border-radius: 50%;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #c82333;
  }
`;
