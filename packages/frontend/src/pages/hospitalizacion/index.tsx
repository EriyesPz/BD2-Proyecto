import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputDate, InputText, Label, Select, Table } from "../../components/ui";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

// Datos de ejemplo
const hospitalizaciones = [
  {
    id: 1,
    paciente: "María García",
    habitacion: "201",
    tipoHabitacion: "Individual",
    fechaIngreso: new Date(2024, 0, 15),
    estado: "activa",
  },
  {
    id: 2,
    paciente: "Juan Pérez",
    habitacion: "302",
    tipoHabitacion: "Doble",
    fechaIngreso: new Date(2024, 0, 10),
    estado: "alta",
  },
  {
    id: 3,
    paciente: "Ana Martínez",
    habitacion: "105",
    tipoHabitacion: "Individual",
    fechaIngreso: new Date(2024, 0, 20),
    estado: "activa",
  },
];

// Estilización con styled-components
const Container = styled.div`
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Badge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const TableActions = styled.div`
  display: flex;
  gap: 8px;
`;

// Función para determinar el color del estado
const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "activa":
      return <Badge color="#4caf50">Activa</Badge>;
    case "alta":
      return <Badge color="#2196f3">Alta</Badge>;
    case "cancelado":
      return <Badge color="#f44336">Cancelado</Badge>;
    default:
      return null;
  }
};

export const Hospitalizacion = () => {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todas");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  return (
    <Container>
      <Header>
        <h1>Gestión de Hospitalizaciones</h1>
        <Button>+ Nueva Hospitalización</Button>
      </Header>
      <FilterContainer>
        <div>
          <Label>Búsqueda</Label>
          <InputText
            placeholder="Buscar paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div>
          <Label>Estado</Label>
          <Select
            options={[
              { value: "todas", label: "Todas" },
              { value: "activas", label: "Activas" },
              { value: "alta", label: "Alta" },
              { value: "cancelado", label: "Cancelado" },
            ]}
            onChange={(value) => setEstado(value)}
            placeholder="Seleccionar estado"
          />
        </div>
        <div>
          <Label>Fecha Inicio</Label>
          <InputDate
            value={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
          />
        </div>
        <div>
          <Label>Fecha Fin</Label>
          <InputDate
            value={fechaFin}
            onChange={(date) => setFechaFin(date)}
          />
        </div>
      </FilterContainer>
      <Table
        columnas={[
          { header: "Paciente", accessorKey: "paciente" },
          { header: "Habitación", accessorKey: "habitacion" },
          { header: "Tipo", accessorKey: "tipoHabitacion" },
          { header: "Fecha de Ingreso", accessorKey: "fechaIngreso" },
          { header: "Días", accessorKey: "dias" },
          { header: "Estado", accessorKey: "estado" },
          { header: "Acciones", accessorKey: "acciones" },
        ]}
        datos={hospitalizaciones.map((h) => ({
          paciente: h.paciente,
          habitacion: h.habitacion,
          tipoHabitacion: h.tipoHabitacion,
          fechaIngreso: format(h.fechaIngreso, "dd/MM/yyyy", { locale: es }),
          dias: differenceInDays(new Date(), h.fechaIngreso),
          estado: getEstadoBadge(h.estado),
          acciones: (
            <TableActions>
              <Button>Ver</Button>
              {h.estado === "activa" && <Button>Dar Alta</Button>}
            </TableActions>
          ),
        }))}
      />
    </Container>
  );
}
