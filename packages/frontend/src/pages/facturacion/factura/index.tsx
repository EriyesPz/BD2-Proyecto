/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  ButtonGroup,
  Container,
  Header,
  Section,
  SubHeader,
  Summary,
} from "./styled";
import { Table, Button, InputText, Select } from "../../../components/ui";
import { getFacturaPorID, getFacturas } from "../../../lib/api";

export const Factura = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedPaciente, setSelectedPaciente] = useState<string>("");
  const [facturas, setFacturas] = useState<any[]>([]);
  const [factura, setFactura] = useState<any | null>(null);
  const [loadingFactura, setLoadingFactura] = useState(false);
  const [loadingFacturas, setLoadingFacturas] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await getFacturas();
        console.log("Facturas recibidas:", data);
        setFacturas(data);
      } catch (err) {
        console.error("Error al cargar la lista de facturas:", err);
        setError("Error al cargar la lista de facturas.");
      } finally {
        setLoadingFacturas(false);
      }
    };
    fetchFacturas();
  }, []);

  useEffect(() => {
    const paciente = selectedPaciente || searchValue;
    if (!paciente) return;

    const fetchFactura = async () => {
      try {
        setLoadingFactura(true);
        const data = await getFacturaPorID(paciente);
        setFactura(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la factura:", err);
        setError("Error al cargar los detalles de la factura.");
        setFactura(null);
      } finally {
        setLoadingFactura(false);
      }
    };

    fetchFactura();
  }, [selectedPaciente, searchValue]);

  const servicios = factura
    ? [
        {
          descripcion: "Hospitalización",
          cantidad: 1,
          precioUnitario: factura.CostoHospitalizacion || 0,
        },
        {
          descripcion: "Consulta Médica",
          cantidad: 1,
          precioUnitario: factura.MotivoConsulta
            ? factura.PrecioMedicamento || 0
            : 0,
        },
        {
          descripcion: factura.ExamenRealizado || "Examen",
          cantidad: 1,
          precioUnitario: factura.PrecioExamen || 0,
        },
      ]
    : [];

  const subtotal = servicios.reduce(
    (acc, servicio) => acc + servicio.cantidad * servicio.precioUnitario,
    0
  );
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;
  const totalPagado = factura?.TotalFactura || 0;
  const saldoPendiente = total - totalPagado;

  const handlePrint = () => console.log("Imprimiendo factura...");
  const handlePay = () => console.log("Procesando pago...");

  return (
    <Container>
      <Header>Detalles de Factura</Header>
      <Section>
        <SubHeader>Buscar Factura</SubHeader>
        <InputText
          placeholder="Ingrese el nombre del paciente"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setSelectedPaciente("");
          }}
        />
        <SubHeader>O seleccionar de la lista</SubHeader>
        {loadingFacturas ? (
          <p>Cargando lista de facturas...</p>
        ) : (
          <Select
            options={facturas.map((factura) => ({
              value: factura.NombrePaciente || factura.FacturaID.toString(),
              label: factura.NombrePaciente
                ? `Factura de ${factura.NombrePaciente}`
                : `Factura #${factura.NombrePaciente}`,
            }))}
            placeholder="Seleccione una factura"
            onChange={(value) => setSelectedPaciente(value)}
          />
        )}
      </Section>
      {loadingFactura ? (
        <Section>Cargando detalles de la factura...</Section>
      ) : error ? (
        <Section>{error}</Section>
      ) : factura ? (
        <>
          <Section>
            <SubHeader>Información del Paciente</SubHeader>
            <p>
              <strong>Nombre:</strong> {factura.NombrePaciente}
            </p>
            <p>
              <strong>Número de Seguro Social:</strong>{" "}
              {factura.NumeroSeguroSocial}
            </p>
            <p>
              <strong>Contacto:</strong> {factura.ContactoPaciente}
            </p>
            <p>
              <strong>Email:</strong> {factura.EmailPaciente}
            </p>
          </Section>
          <Section>
            <SubHeader>Detalle de Servicios Facturados</SubHeader>
            <Table
              columnas={[
                {
                  header: "Descripción del Servicio",
                  accessorKey: "descripcion",
                },
                { header: "Cantidad", accessorKey: "cantidad" },
                { header: "Precio Unitario", accessorKey: "precioUnitario" },
                { header: "Subtotal", accessorKey: "subtotal" },
              ]}
              datos={servicios.map((servicio) => ({
                descripcion: servicio.descripcion,
                cantidad: servicio.cantidad,
                precioUnitario: `$${servicio.precioUnitario.toFixed(2)}`,
                subtotal: `$${(
                  servicio.cantidad * servicio.precioUnitario
                ).toFixed(2)}`,
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
            <Button onClick={handlePrint}>Imprimir Factura</Button>
            {saldoPendiente > 0 && (
              <Button onClick={handlePay}>Registrar Pago</Button>
            )}
          </ButtonGroup>
        </>
      ) : (
        <Section>No hay datos para mostrar.</Section>
      )}
    </Container>
  );
};
