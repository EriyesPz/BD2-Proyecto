import React, { useEffect, useState } from "react";
import { obtenerFacturas } from "../lib";
import { Link } from "react-router-dom";

interface Factura {
  FacturaID: string;
  PacienteID: string;
  PacienteNombreCompleto: string;
  PacienteTelefono: string;
  PacienteEmail: string;
  PacienteDireccion: string;
  PacienteSeguroSocial: string;
  FechaFactura: string;
  TotalFactura: number;
  EstadoPago: "Pagado" | "Pendiente" | "Anulado";
  Servicio: string;
  Descripcion: string;
  Cantidad: number;
  PrecioUnitario: number;
  TotalServicio: number;
}

const FacturasPage: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await obtenerFacturas();
        setFacturas(data);
      } catch (error) {
        console.error("Error al obtener facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    overflowX: "auto", // Permite scroll horizontal si es necesario.
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "40px",
    minWidth: "1200px", // Ajusta según la cantidad de columnas
  };

  const thtdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    fontSize: "14px",
    textAlign: "left",
    verticalAlign: "top",
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "#f2f2f2",
  };

  const estadoStyle = (estado: "Pagado" | "Pendiente" | "Anulado"): React.CSSProperties => {
    let color = "#333";
    let bgColor = "#fff";
    switch (estado) {
      case "Pagado":
        bgColor = "#2ecc71";
        color = "#fff";
        break;
      case "Pendiente":
        bgColor = "#f1c40f";
        color = "#fff";
        break;
      case "Anulado":
        bgColor = "#e74c3c";
        color = "#fff";
        break;
    }
    return {
      backgroundColor: bgColor,
      color: color,
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "bold",
      display: "inline-block",
      fontSize: "12px",
    };
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Facturas</h1>

      {facturas.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              {/* Información de la Factura */}
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Fecha</th>
              <th style={thtdStyle}>Estado</th>
              <th style={thtdStyle}>Total Factura</th>

              {/* Información del Paciente */}
              <th style={thtdStyle}>Nombre Paciente</th>
              <th style={thtdStyle}>Teléfono</th>
              <th style={thtdStyle}>Email</th>
              <th style={thtdStyle}>Dirección</th>
              <th style={thtdStyle}>Seguro Social</th>

              {/* Información del Servicio */}
              <th style={thtdStyle}>Servicio</th>
              <th style={thtdStyle}>Descripción</th>
              <th style={thtdStyle}>Cantidad</th>
              <th style={thtdStyle}>Precio Unit.</th>
              <th style={thtdStyle}>Total Servicio</th>

              {/* Acción (Pagar) */}
              <th style={thtdStyle}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => {
              const fecha = new Date(factura.FechaFactura).toLocaleString();
              const puedePagar = factura.EstadoPago !== "Pagado";
              return (
                <tr key={factura.FacturaID}>
                  {/* Factura */}
                  <td style={thtdStyle}>{factura.FacturaID}</td>
                  <td style={thtdStyle}>{fecha}</td>
                  <td style={thtdStyle}>
                    <span style={estadoStyle(factura.EstadoPago)}>{factura.EstadoPago}</span>
                  </td>
                  <td style={thtdStyle}>{factura.TotalFactura.toFixed(2)}</td>

                  {/* Paciente */}
                  <td style={thtdStyle}>{factura.PacienteNombreCompleto}</td>
                  <td style={thtdStyle}>{factura.PacienteTelefono}</td>
                  <td style={thtdStyle}>{factura.PacienteEmail}</td>
                  <td style={thtdStyle}>{factura.PacienteDireccion}</td>
                  <td style={thtdStyle}>{factura.PacienteSeguroSocial}</td>

                  {/* Servicio */}
                  <td style={thtdStyle}>{factura.Servicio}</td>
                  <td style={thtdStyle}>{factura.Descripcion}</td>
                  <td style={thtdStyle}>{factura.Cantidad}</td>
                  <td style={thtdStyle}>{factura.PrecioUnitario.toFixed(2)}</td>
                  <td style={thtdStyle}>{factura.TotalServicio.toFixed(2)}</td>

                  {/* Acción */}
                  <td style={thtdStyle}>
                    {puedePagar ? (
                      <Link
                        to={`/pagar-factura?facturaID=${factura.FacturaID}`}
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#2980b9",
                          color: "#fff",
                          textDecoration: "none",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Pagar
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No hay facturas registradas.</p>
      )}
    </div>
  );
};

export { FacturasPage };
