import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

export const FormContainer = styled.div`
  width: 500px;
  padding: 48px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-bottom: 8px;
  align-items: center;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: #514D4D;
  margin-bottom: 24px;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

export const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
`;
