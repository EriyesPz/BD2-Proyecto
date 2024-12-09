import React, { useState, useEffect } from "react";
import {
  crearHospitalizacionConFactura,
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

const CrearHospitalizacionConFacturaPage: React.FC = () => {
  const [pacienteID, setPacienteID] = useState("");
  const [habitacionID, setHabitacionID] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [totalFactura, setTotalFactura] = useState<number>(0);
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
    if (
      !pacienteID ||
      !habitacionID ||
      !fechaIngreso ||
      !diagnostico ||
      totalFactura === 0
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const facturaData = {
      pacienteID,
      habitacionID,
      fechaIngreso,
      diagnostico,
      totalFactura,
    };

    try {
      await crearHospitalizacionConFactura(facturaData);
      alert("Hospitalización con factura creada con éxito.");
      navigate("/hospitalizaciones");
    } catch (error) {
      console.error("Error al crear hospitalización con factura:", error);
      alert("Ocurrió un error al crear la hospitalización con factura.");
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
      <h1 style={{ marginBottom: "20px" }}>
        Crear Hospitalización con Factura
      </h1>
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

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Total Factura*:</span>
          <input
            type="number"
            step="0.01"
            value={totalFactura}
            onChange={(e) => setTotalFactura(parseFloat(e.target.value))}
            required
            style={inputStyle}
            placeholder="Ej: 1000.00"
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Crear Hospitalización con Factura
        </button>
      </form>
    </div>
  );
};

export { CrearHospitalizacionConFacturaPage };
