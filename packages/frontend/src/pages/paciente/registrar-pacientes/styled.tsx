import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  padding: 16px;
  font-family: "Roboto", sans-serif;
`;

export const CardHeader = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FullWidth = styled.div`
  grid-column: span 2;
`;
