import React, { useEffect, useState } from "react";
import { obtenerHonorariosMedicos } from "../lib";

interface Medico {
  MedicoID?: string;
  Nombre: string;
  Apellido: string;
  EspecialidadID: number;
  Interno: boolean;
  HonorariosConsulta: number | null;
  HonorariosCirugia?: number | null;
  Email?: string;
  FechaRegistro?: string;
}

const HonorariosMedicosPage: React.FC = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
    const fetchHonorarios = async () => {
      try {
        const data = await obtenerHonorariosMedicos();
        setMedicos(data);
      } catch (error) {
        console.error("Error al obtener honorarios médicos:", error);
      }
    };

    fetchHonorarios();
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    overflowX: "auto",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "40px",
    minWidth: "800px",
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

  const formatNumero = (valor: number | null | undefined): string => {
    return valor != null ? valor.toFixed(2) : "N/A";
  };

  const formatFecha = (fecha?: string): string => {
    return fecha ? new Date(fecha).toLocaleString() : "N/A";
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Honorarios Médicos</h1>

      {medicos.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Nombre</th>
              <th style={thtdStyle}>Apellido</th>
              <th style={thtdStyle}>EspecialidadID</th>
              <th style={thtdStyle}>Interno</th>
              <th style={thtdStyle}>Honorarios Consulta</th>
              <th style={thtdStyle}>Honorarios Cirugía</th>
              <th style={thtdStyle}>Email</th>
              <th style={thtdStyle}>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((med) => (
              <tr key={med.MedicoID}>
                <td style={thtdStyle}>{med.MedicoID || "N/A"}</td>
                <td style={thtdStyle}>{med.Nombre}</td>
                <td style={thtdStyle}>{med.Apellido}</td>
                <td style={thtdStyle}>{med.EspecialidadID}</td>
                <td style={thtdStyle}>{med.Interno ? "Sí" : "No"}</td>
                <td style={thtdStyle}>{formatNumero(med.HonorariosConsulta)}</td>
                <td style={thtdStyle}>{formatNumero(med.HonorariosCirugia)}</td>
                <td style={thtdStyle}>{med.Email || "N/A"}</td>
                <td style={thtdStyle}>{formatFecha(med.FechaRegistro)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay médicos registrados.</p>
      )}
    </div>
  );
};

export { HonorariosMedicosPage };
