import  { useState } from "react";
import styled from "styled-components";
import { Button, InputDate, InputText, Label, Select, Table } from "../../../components/ui";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// Datos de ejemplo
const facturas = [
  {
    id: "001",
    paciente: "Juan Pérez",
    fechaEmision: "2023-05-15",
    total: 100.0,
    estado: "Pendiente",
  },
  {
    id: "002",
    paciente: "María García",
    fechaEmision: "2023-05-20",
    total: 150.0,
    estado: "Pagado",
  },
  {
    id: "003",
    paciente: "Carlos López",
    fechaEmision: "2023-06-01",
    total: 200.0,
    estado: "Anulado",
  },
];

export const ListaFacturas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [estadoPago, setEstadoPago] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const filteredFacturas = facturas.filter((factura) => {
    const matchesBusqueda =
      !busqueda ||
      factura.id.includes(busqueda) ||
      factura.paciente.toLowerCase().includes(busqueda.toLowerCase());
    const matchesEstado =
      !estadoPago || estadoPago === "todas" || factura.estado === estadoPago;
    const matchesFecha =
      (!fechaInicio || factura.fechaEmision >= fechaInicio) &&
      (!fechaFin || factura.fechaEmision <= fechaFin);
    return matchesBusqueda && matchesEstado && matchesFecha;
  });

  return (
    <Container>
      <Header>Lista de Facturas</Header>
      <FiltersContainer>
        <div>
          <Label>Búsqueda</Label>
          <InputText
            placeholder="Buscar factura..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div>
          <Label>Estado de Pago</Label>
          <Select
            options={[
              { value: "todas", label: "Todas" },
              { value: "Pagado", label: "Pagado" },
              { value: "Pendiente", label: "Pendiente" },
              { value: "Anulado", label: "Anulado" },
            ]}
            placeholder="Seleccione un estado"
            onChange={(value) => setEstadoPago(value)}
          />
        </div>
        <div>
          <Label>Fecha Inicio</Label>
          <InputDate
            value={fechaInicio}
            onChange={(value) => setFechaInicio(value)}
          />
        </div>
        <div>
          <Label>Fecha Fin</Label>
          <InputDate
            value={fechaFin}
            onChange={(value) => setFechaFin(value)}
          />
        </div>
      </FiltersContainer>
      <Table
        columnas={[
          { header: "Número de Factura", accessorKey: "id" },
          { header: "Paciente", accessorKey: "paciente" },
          { header: "Fecha de Emisión", accessorKey: "fechaEmision" },
          { header: "Total", accessorKey: "total" },
          { header: "Estado de Pago", accessorKey: "estado" },
          { header: "Acciones", accessorKey: "acciones" },
        ]}
        datos={filteredFacturas.map((factura) => ({
          ...factura,
          acciones: (
            <ButtonGroup>
              <Button>Ver</Button>
              <Button>Pagar</Button>
              <Button>Anular</Button>
            </ButtonGroup>
          ),
        }))}
      />
      <ActionsContainer>
        <Button>
          + Nueva Factura
        </Button>
      </ActionsContainer>
    </Container>
  );
}
