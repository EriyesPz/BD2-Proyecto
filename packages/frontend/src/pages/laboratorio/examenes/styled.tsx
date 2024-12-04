import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

export const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const NewButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ModalHeader = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;
