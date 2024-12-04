import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

export const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const Content = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  font-size: 14px;
`;

export const TabsContainer = styled.div`
  margin-top: 20px;
`;

export const TabList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background: ${({ active }) => (active ? "#007bff" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;

  &:hover {
    background: ${({ active }) => (active ? "#0056b3" : "#e0e0e0")};
  }
`;

export const TabContent = styled.div`
  margin-top: 20px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;
