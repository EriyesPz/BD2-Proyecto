import React, { useEffect, useState } from "react";
import { getConsultas } from "../lib";

interface ConsultaDetallada {
  ConsultaID: string;
  FechaConsulta: string;
  MotivoConsulta: string;
  Diagnostico: string;
  Prescripcion: string | null;
  PacienteID: string;
  NombrePaciente: string;
  ApellidoPaciente: string;
  PacienteFechaNacimiento: string;
  PacienteGenero: string;
  PacienteTelefono: string;
  PacienteEmail: string;
  PacienteDireccion: string;
  PacienteSeguroSocial: string;
  PacienteFechaRegistro: string;
  MedicoID: string;
  NombreMedico: string;
  ApellidoMedico: string;
  EspecialidadID: number;
  MedicoInterno: boolean;
  HonorariosConsulta: number;
  HonorariosCirugia: number | null;
  MedicoEmail: string;
  MedicoFechaRegistro: string;
}

const ConsultasPage: React.FC = () => {
  const [consultas, setConsultas] = useState<ConsultaDetallada[]>([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const data = await getConsultas();
        setConsultas(data);
      } catch (error) {
        console.error("Error al obtener las consultas:", error);
      }
    };

    fetchConsultas();
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
    minWidth: "1500px", // Hay muchas columnas, se incrementa el mínimo
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

  const formatFecha = (fecha?: string): string => {
    return fecha ? new Date(fecha).toLocaleString() : "N/A";
  };

  const formatNumero = (valor?: number | null): string => {
    return valor != null ? valor.toFixed(2) : "N/A";
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Consultas</h1>

      {consultas.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              {/* Datos de la Consulta */}
              <th style={thtdStyle}>ConsultaID</th>
              <th style={thtdStyle}>Fecha Consulta</th>
              <th style={thtdStyle}>Motivo Consulta</th>
              <th style={thtdStyle}>Diagnóstico</th>
              <th style={thtdStyle}>Prescripción</th>

              {/* Datos del Paciente */}
              <th style={thtdStyle}>PacienteID</th>
              <th style={thtdStyle}>Nombre Paciente</th>
              <th style={thtdStyle}>Apellido Paciente</th>
              <th style={thtdStyle}>Fecha Nacimiento Paciente</th>
              <th style={thtdStyle}>Género Paciente</th>
              <th style={thtdStyle}>Teléfono Paciente</th>
              <th style={thtdStyle}>Email Paciente</th>
              <th style={thtdStyle}>Dirección Paciente</th>
              <th style={thtdStyle}>Seguro Social Paciente</th>
              <th style={thtdStyle}>Fecha Registro Paciente</th>

              {/* Datos del Médico */}
              <th style={thtdStyle}>MedicoID</th>
              <th style={thtdStyle}>Nombre Médico</th>
              <th style={thtdStyle}>Apellido Médico</th>
              <th style={thtdStyle}>EspecialidadID</th>
              <th style={thtdStyle}>Interno</th>
              <th style={thtdStyle}>Honorarios Consulta</th>
              <th style={thtdStyle}>Honorarios Cirugía</th>
              <th style={thtdStyle}>Email Médico</th>
              <th style={thtdStyle}>Fecha Registro Médico</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((con) => {
              return (
                <tr key={con.ConsultaID}>
                  {/* Datos de la Consulta */}
                  <td style={thtdStyle}>{con.ConsultaID}</td>
                  <td style={thtdStyle}>{formatFecha(con.FechaConsulta)}</td>
                  <td style={thtdStyle}>{con.MotivoConsulta || "N/A"}</td>
                  <td style={thtdStyle}>{con.Diagnostico || "N/A"}</td>
                  <td style={thtdStyle}>{con.Prescripcion || "N/A"}</td>

                  {/* Datos del Paciente */}
                  <td style={thtdStyle}>{con.PacienteID || "N/A"}</td>
                  <td style={thtdStyle}>{con.NombrePaciente || "N/A"}</td>
                  <td style={thtdStyle}>{con.ApellidoPaciente || "N/A"}</td>
                  <td style={thtdStyle}>{formatFecha(con.PacienteFechaNacimiento)}</td>
                  <td style={thtdStyle}>{con.PacienteGenero || "N/A"}</td>
                  <td style={thtdStyle}>{con.PacienteTelefono || "N/A"}</td>
                  <td style={thtdStyle}>{con.PacienteEmail || "N/A"}</td>
                  <td style={thtdStyle}>{con.PacienteDireccion || "N/A"}</td>
                  <td style={thtdStyle}>{con.PacienteSeguroSocial || "N/A"}</td>
                  <td style={thtdStyle}>{formatFecha(con.PacienteFechaRegistro)}</td>

                  {/* Datos del Médico */}
                  <td style={thtdStyle}>{con.MedicoID || "N/A"}</td>
                  <td style={thtdStyle}>{con.NombreMedico || "N/A"}</td>
                  <td style={thtdStyle}>{con.ApellidoMedico || "N/A"}</td>
                  <td style={thtdStyle}>{con.EspecialidadID != null ? con.EspecialidadID : "N/A"}</td>
                  <td style={thtdStyle}>{con.MedicoInterno ? "Sí" : "No"}</td>
                  <td style={thtdStyle}>{formatNumero(con.HonorariosConsulta)}</td>
                  <td style={thtdStyle}>{formatNumero(con.HonorariosCirugia)}</td>
                  <td style={thtdStyle}>{con.MedicoEmail || "N/A"}</td>
                  <td style={thtdStyle}>{formatFecha(con.MedicoFechaRegistro)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No hay consultas registradas.</p>
      )}
    </div>
  );
};

export { ConsultasPage };
