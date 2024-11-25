import { Table, InputText, Label } from "../../components/ui";
import { ColumnDef } from "@tanstack/react-table";
import styled from "styled-components";

const ContenedorPagina = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const BarraBusqueda = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const columnas: ColumnDef<any>[] = [
  { accessorKey: "nombreCompleto", header: "Nombre Completo" },
  { accessorKey: "edad", header: "Edad" },
  { accessorKey: "genero", header: "Género" },
  { accessorKey: "telefono", header: "Teléfono" },
  { accessorKey: "email", header: "Email" },
];

const datos = [
  {
    nombreCompleto: "Juan Pérez",
    edad: 35,
    genero: "Masculino",
    telefono: "555-1234",
    email: "juan@example.com",
  },
  {
    nombreCompleto: "Ana Gómez",
    edad: 29,
    genero: "Femenino",
    telefono: "555-5678",
    email: "ana@example.com",
  },
  {
    nombreCompleto: "Carlos López",
    edad: 42,
    genero: "Masculino",
    telefono: "555-8765",
    email: "carlos@example.com",
  },
];

export const PaginaTabla = () => {
  return (
    <ContenedorPagina>
      <Titulo>Lista de Pacientes</Titulo>
      <BarraBusqueda>
        <Label>Buscar Paciente:</Label>
        <InputText placeholder="Escribe un nombre" />
      </BarraBusqueda>
      <Table columnas={columnas} datos={datos} />
    </ContenedorPagina>
  );
};
