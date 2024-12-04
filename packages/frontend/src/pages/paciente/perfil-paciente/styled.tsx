import styled from "styled-components";
import { Button } from "../../../components/ui";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  font-family: "Roboto", sans-serif;
`;

export const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsList = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const TabsTrigger = styled(Button)<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#007bff" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#0056b3" : "#e9ecef")};
  }
`;

export const TabsContent = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
`;
