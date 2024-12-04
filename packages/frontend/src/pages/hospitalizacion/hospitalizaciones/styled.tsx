import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Badge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export const TableActions = styled.div`
  display: flex;
  gap: 8px;
`;
