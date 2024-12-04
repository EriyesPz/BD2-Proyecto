import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const CardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #555;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

export const HighlightText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

export const Calendar = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  height: 300px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
