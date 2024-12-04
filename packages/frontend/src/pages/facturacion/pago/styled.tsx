import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  resize: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
