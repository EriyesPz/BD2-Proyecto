import React, { useEffect, useState } from "react";
import { obtenerHospitalizaciones } from "../lib";
import { Link } from "react-router-dom";

interface Hospitalizacion {
  HospitalizacionID: string;
  PacienteID: string;
  HabitacionID: string;
  FechaIngreso: string;
  FechaAlta?: string;
  Diagnostico: string;
  Estado: string;
}

const HospitalizacionesPage: React.FC = () => {
  const [hospitalizaciones, setHospitalizaciones] = useState<Hospitalizacion[]>([]);

  useEffect(() => {
    const fetchHospitalizaciones = async () => {
      try {
        const data = await obtenerHospitalizaciones();
        setHospitalizaciones(data);
      } catch (error) {
        console.error("Error al obtener hospitalizaciones:", error);
      }
    };

    fetchHospitalizaciones();
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "40px",
    marginTop: "20px",
  };

  const thtdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    fontSize: "14px",
    textAlign: "left",
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "#f2f2f2",
  };

  const actionContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: "8px 12px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    textDecoration: "none",
    transition: "background-color 0.3s",
  };

  const detailLinkStyle: React.CSSProperties = {
    padding: "6px 10px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "12px",
    textDecoration: "none",
    marginLeft: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Hospitalizaciones</h1>

      {hospitalizaciones.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Paciente</th>
              <th style={thtdStyle}>Habitación</th>
              <th style={thtdStyle}>Fecha Ingreso</th>
              <th style={thtdStyle}>Fecha Alta</th>
              <th style={thtdStyle}>Diagnóstico</th>
              <th style={thtdStyle}>Estado</th>
              <th style={thtdStyle}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {hospitalizaciones.map((h) => (
              <tr key={h.HospitalizacionID}>
                <td style={thtdStyle}>{h.HospitalizacionID}</td>
                <td style={thtdStyle}>{h.PacienteID}</td>
                <td style={thtdStyle}>{h.HabitacionID}</td>
                <td style={thtdStyle}>{h.FechaIngreso}</td>
                <td style={thtdStyle}>{h.FechaAlta ?? "N/A"}</td>
                <td style={thtdStyle}>{h.Diagnostico}</td>
                <td style={thtdStyle}>{h.Estado}</td>
                <td style={thtdStyle}>
                  <Link to={`/hospitalizacion/${h.HospitalizacionID}`} style={detailLinkStyle}>
                    Ver Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay hospitalizaciones registradas.</p>
      )}

      <h2 style={{ marginBottom: "20px" }}>Acciones</h2>
      <div style={actionContainerStyle}>
        <Link to="/hospitalizacion/crear" style={actionButtonStyle}>
          Crear Hospitalización
        </Link>
        <Link to="/hospitalizacion/crear-factura" style={actionButtonStyle}>
          Crear Hospitalización con Factura
        </Link>
        <Link to="/hospitalizacion/dar-alta" style={actionButtonStyle}>
          Dar Alta Hospitalización
        </Link>
      </div>
    </div>
  );
};

export { HospitalizacionesPage };
