import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
`;

export const IconContainer = styled.div`
  margin-right: 8px;
  color: #6d6d6d;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #000000;
  font-family: sans-serif, Roboto;

  ::placeholder {
    color: #a0a0a0;
  }
`;
