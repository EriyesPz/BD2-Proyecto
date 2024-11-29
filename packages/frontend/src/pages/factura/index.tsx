import { useState } from "react";
import styled from "styled-components";
import { Table, Button } from "../../components/ui";

// Estilización con styled-components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SubHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const facturaData = {
  paciente: {
    nombre: "Juan Pérez",
    id: "PAC-001",
  },
  servicios: [
    { descripcion: "Consulta General", cantidad: 1, precioUnitario: 50 },
    { descripcion: "Radiografía", cantidad: 2, precioUnitario: 75 },
    { descripcion: "Medicamentos", cantidad: 1, precioUnitario: 30 },
  ],
  impuestos: 15,
  totalPagado: 100,
};

export const Factura = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const { paciente, servicios, impuestos, totalPagado } = facturaData;
  const subtotal = servicios.reduce(
    (acc, servicio) => acc + servicio.cantidad * servicio.precioUnitario,
    0
  );
  const total = subtotal + impuestos;
  const saldoPendiente = total - totalPagado;

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => setIsPrinting(false), 2000);
  };

  const handleEmail = () => {
    setIsEmailing(true);
    setTimeout(() => setIsEmailing(false), 2000);
  };

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => setIsPaying(false), 2000);
  };

  return (
    <Container>
      <Header>Detalles de Factura</Header>

      {/* Información del Paciente */}
      <Section>
        <SubHeader>Información del Paciente</SubHeader>
        <p>
          <strong>Nombre:</strong> {paciente.nombre}
        </p>
        <p>
          <strong>ID:</strong> {paciente.id}
        </p>
      </Section>

      {/* Detalle de Servicios Facturados */}
      <Section>
        <SubHeader>Detalle de Servicios Facturados</SubHeader>
        <Table
          columnas={[
            { header: "Descripción del Servicio", accessorKey: "descripcion" },
            { header: "Cantidad", accessorKey: "cantidad" },
            { header: "Precio Unitario", accessorKey: "precioUnitario" },
            { header: "Subtotal", accessorKey: "subtotal" },
          ]}
          datos={servicios.map((servicio) => ({
            descripcion: servicio.descripcion,
            cantidad: servicio.cantidad,
            precioUnitario: `$${servicio.precioUnitario.toFixed(2)}`,
            subtotal: `$${(servicio.cantidad * servicio.precioUnitario).toFixed(2)}`,
          }))}
        />
      </Section>
      <Section>
        <SubHeader>Resumen de Costos</SubHeader>
        <Summary>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </Summary>
        <Summary>
          <span>Impuestos:</span>
          <span>${impuestos.toFixed(2)}</span>
        </Summary>
        <Summary>
          <strong>Total a Pagar:</strong>
          <strong>${total.toFixed(2)}</strong>
        </Summary>
        <Summary>
          <span>Total Pagado:</span>
          <span>${totalPagado.toFixed(2)}</span>
        </Summary>
        <Summary>
          <strong>Saldo Pendiente:</strong>
          <strong>${saldoPendiente.toFixed(2)}</strong>
        </Summary>
      </Section>
      <ButtonGroup>
        <Button onClick={handlePrint} disabled={isPrinting}>
          {isPrinting ? "Imprimiendo..." : "Imprimir Factura"}
        </Button>
        <Button onClick={handleEmail} disabled={isEmailing}>
          {isEmailing ? "Enviando..." : "Enviar por Email"}
        </Button>
        {saldoPendiente > 0 && (
          <Button onClick={handlePay} disabled={isPaying}>
            {isPaying ? "Procesando..." : "Registrar Pago"}
          </Button>
        )}
      </ButtonGroup>
    </Container>
  );
}
