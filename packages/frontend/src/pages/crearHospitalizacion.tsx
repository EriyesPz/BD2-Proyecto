// src/pages/CrearHospitalizacionPage.tsx
import React, { useState, useEffect } from "react";
import {
  crearHospitalizacion,
  obtenerPacientes,
  obtenerHabitacionesDisponibles,
} from "../lib";
import { useNavigate } from "react-router-dom";

interface Paciente {
  PacienteID: string;
  Nombre: string;
  Apellido: string;
}

interface Habitacion {
  HabitacionID: string;
  NumeroHabitacion: string;
}

const CrearHospitalizacionPage: React.FC = () => {
  const [pacienteID, setPacienteID] = useState("");
  const [habitacionID, setHabitacionID] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacData = await obtenerPacientes();
        setPacientes(pacData);
        const habData = await obtenerHabitacionesDisponibles();
        setHabitaciones(habData);
      } catch (error) {
        console.error("Error al obtener datos para el formulario:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteID || !habitacionID || !fechaIngreso || !diagnostico) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await crearHospitalizacion({
        pacienteID,
        habitacionID,
        fechaIngreso,
        diagnostico,
      });
      alert("Hospitalización creada con éxito.");
      navigate("/hospitalizaciones");
    } catch (error) {
      console.error("Error al crear hospitalización:", error);
      alert("Ocurrió un error al crear la hospitalización.");
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
    backgroundColor: "#fff",
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
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Crear Hospitalización</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Paciente*:</span>
          {pacientes.length > 0 ? (
            <select
              value={pacienteID}
              onChange={(e) => setPacienteID(e.target.value)}
              required
              style={selectStyle}
            >
              <option value="">-- Seleccionar Paciente --</option>
              {pacientes.map((p) => (
                <option key={p.PacienteID} value={p.PacienteID}>
                  {p.Nombre} {p.Apellido}
                </option>
              ))}
            </select>
          ) : (
            <p>Cargando pacientes...</p>
          )}
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Habitación*:</span>
          {habitaciones.length > 0 ? (
            <select
              value={habitacionID}
              onChange={(e) => setHabitacionID(e.target.value)}
              required
              style={selectStyle}
            >
              <option value="">-- Seleccionar Habitación --</option>
              {habitaciones.map((h) => (
                <option key={h.HabitacionID} value={h.HabitacionID}>
                  {h.NumeroHabitacion}
                </option>
              ))}
            </select>
          ) : (
            <p>Cargando habitaciones...</p>
          )}
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>
            Fecha Ingreso* (YYYY-MM-DD HH:MM:SS):
          </span>
          <input
            type="datetime-local"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: 2024-12-10 14:30:00"
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Diagnóstico*:</span>
          <input
            type="text"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            required
            style={inputStyle}
            placeholder="Descripción del diagnóstico"
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Crear Hospitalización
        </button>
      </form>
    </div>
  );
};

export { CrearHospitalizacionPage };
