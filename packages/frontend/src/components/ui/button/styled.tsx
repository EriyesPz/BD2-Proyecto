import styled from "styled-components";

export const ButtonContainer = styled.button`
  background-color: #1c1c1c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-family: sans-serif, Roboto;
  cursor: pointer;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #333333;
  }

  &:active {
    background-color: #000000;
  }
`;