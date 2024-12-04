import React, { useEffect, useState } from "react";
import { ActionsContainer, ButtonGroup, Container, FiltersContainer, Header } from "./styled";
import { Button, InputDate, InputText, Label, Select, Table } from "../../../components/ui";
import { getFacturas } from "../../../lib/api";

interface Factura {
  FacturaID: number;
  FechaFactura: string;
  TotalFactura: number;
  EstadoPago: string;
  Detalles: string | null;
  PacienteID: number;
  NombreCompleto: string;
  FechaNacimiento: string;
  Genero: string;
  Telefono: string;
  Email: string;
  NumeroSeguroSocial: string;
}

export const ListaFacturas = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [estadoPago, setEstadoPago] = useState("todas");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        setLoading(true);
        const data: Factura[] = await getFacturas();
        setFacturas(data);
      } catch (err) {
        console.error("Error al obtener facturas:", err);
        setError("Error al cargar las facturas.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  const filteredFacturas = facturas.filter((factura) => {
    const matchesBusqueda =
      !busqueda ||
      factura.FacturaID.toString().includes(busqueda) ||
      factura.NombreCompleto.toLowerCase().includes(busqueda.toLowerCase());
    const matchesEstado =
      estadoPago === "todas" || factura.EstadoPago === estadoPago;
    const matchesFecha =
      (!fechaInicio || factura.FechaFactura >= fechaInicio) &&
      (!fechaFin || factura.FechaFactura <= fechaFin);
    return matchesBusqueda && matchesEstado && matchesFecha;
  });

  if (loading) {
    return <Container>Cargando facturas...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

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
          { header: "Número de Factura", accessorKey: "FacturaID" },
          { header: "Paciente", accessorKey: "NombreCompleto" },
          { header: "Fecha de Emisión", accessorKey: "FechaFactura" },
          { header: "Total", accessorKey: "TotalFactura" },
          { header: "Estado de Pago", accessorKey: "EstadoPago" },
          { header: "Acciones", accessorKey: "acciones" },
        ]}
        datos={filteredFacturas.map((factura) => ({
          ...factura,
          acciones: (
            <ButtonGroup>
              <Button>Ver</Button>
              <Button disabled={factura.EstadoPago !== "Pendiente"}>Pagar</Button>
              <Button>Anular</Button>
            </ButtonGroup>
          ),
        }))}
      />
      <ActionsContainer>
        <Button>+ Nueva Factura</Button>
      </ActionsContainer>
    </Container>
  );
};
