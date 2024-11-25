import styled from "styled-components";

export const ContenedorTabla = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

export const TablaEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;

export const EncabezadoTabla = styled.th`
  background-color: #f5f5f5;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  text-transform: capitalize;
  font-family: 'Roboto', sans-serif;
`;

export const FilaTabla = styled.tr`
font-family: 'Roboto', sans-serif;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #eef6fc;
  }
`;

export const CeldaTabla = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-family: 'Roboto', sans-serif;
`;

export const ContenedorPaginacion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid #ddd;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
`;

export const BotonPaginacion = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;
