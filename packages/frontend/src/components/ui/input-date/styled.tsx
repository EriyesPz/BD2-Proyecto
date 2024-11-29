import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: #fff;
  width: 200px;
  font-family: "Roboto", sans-serif;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  color: #333;
  font-family: "Roboto", sans-serif;

  &::placeholder {
    color: #aaa;
  }
`;