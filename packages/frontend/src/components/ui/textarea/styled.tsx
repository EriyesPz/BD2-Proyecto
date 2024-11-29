import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  font-family: "Roboto", sans-serif;

  label {
    font-size: 14px;
    color: #333;
  }

  .error {
    font-size: 12px;
    color: red;
    margin-top: 4px;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  resize: vertical;
  min-height: 80px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #aaa;
  }
`;
