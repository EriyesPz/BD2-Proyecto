import styled from "styled-components";

export const Card = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const CardContent = styled.div`
  margin-bottom: 16px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;