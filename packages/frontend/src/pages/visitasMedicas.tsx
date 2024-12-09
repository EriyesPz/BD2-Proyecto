import React, { useEffect, useState } from "react";
import { registrarVisitaMedica, obtenerPacientes, obtenerMedicos } from "../lib";
import { useNavigate } from "react-router-dom";

interface Paciente {
  PacienteID: string;
  Nombre: string;
  Apellido: string;
}

interface Medico {
  MedicoID: string;
  Nombre: string;
  Apellido: string;
}

const RegistrarVisitaMedicaPage: React.FC = () => {
  // Ya no se necesita estado para ConsultaID:
  // const [ConsultaID, setConsultaID] = useState("");
  
  const [MedicoID, setMedicoID] = useState("");
  const [PacienteID, setPacienteID] = useState("");
  const [FechaConsulta, setFechaConsulta] = useState("");
  const [MotivoConsulta, setMotivoConsulta] = useState("");
  const [Diagnostico, setDiagnostico] = useState("");
  const [Prescripcion, setPrescripcion] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // No es necesario obtener consultas si ya no se elige manualmente
        const [pacData, medData] = await Promise.all([
          obtenerPacientes(),
          obtenerMedicos(),
        ]);
        setPacientes(pacData);
        setMedicos(medData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generamos o asignamos un ConsultaID internamente sin pedirlo al usuario:
    const ConsultaID = "CNS:" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    if (!MedicoID || !PacienteID || !FechaConsulta || !MotivoConsulta || !Diagnostico) {
      alert("Todos los campos obligatorios deben ser completados.");
      return;
    }

    const data = {
      ConsultaID,
      MedicoID,
      PacienteID,
      FechaConsulta,
      MotivoConsulta,
      Diagnostico,
      Prescripcion: Prescripcion || undefined,
    };

    try {
      await registrarVisitaMedica(data);
      alert("Visita médica registrada exitosamente.");
      navigate("/hospitalizaciones"); 
    } catch (error) {
      console.error("Error al registrar visita médica:", error);
      alert("Ocurrió un error al registrar la visita médica.");
    }
  };

  // Estilos
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const labelSpanStyle: React.CSSProperties = {
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: "#fff"
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 14px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Registrar Visita Médica</h1>
      <form onSubmit={handleSubmit} style={formStyle}>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Médico*:</span>
          <select
            value={MedicoID}
            onChange={(e) => setMedicoID(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">-- Seleccionar Médico --</option>
            {medicos.map((med) => (
              <option key={med.MedicoID} value={med.MedicoID}>
                {med.Nombre} {med.Apellido}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Paciente*:</span>
          <select
            value={PacienteID}
            onChange={(e) => setPacienteID(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">-- Seleccionar Paciente --</option>
            {pacientes.map((pac) => (
              <option key={pac.PacienteID} value={pac.PacienteID}>
                {pac.Nombre} {pac.Apellido}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>FechaConsulta* (YYYY-MM-DD HH:MM:SS):</span>
          <input
            type="datetime-local"
            value={FechaConsulta}
            onChange={(e) => setFechaConsulta(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>MotivoConsulta*:</span>
          <input
            type="text"
            value={MotivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: Dolor de cabeza"
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Diagnóstico*:</span>
          <input
            type="text"
            value={Diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: Migraña"
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Prescripción (opcional, en XML u otro formato):</span>
          <input
            type="text"
            value={Prescripcion}
            onChange={(e) => setPrescripcion(e.target.value)}
            style={inputStyle}
            placeholder="<Medicamento><Nombre>Paracetamol</Nombre><Dosis>500mg</Dosis></Medicamento>"
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export { RegistrarVisitaMedicaPage };
