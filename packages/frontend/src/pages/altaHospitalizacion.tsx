// src/pages/DarAltaHospitalizacionPage.tsx
import React, { useState, useEffect } from "react";
import { darAltaHospitalizacion, getHospitalizacionesDetalles } from "../lib";
import { useNavigate } from "react-router-dom";

interface HospitalizacionDetallada {
  HospitalizacionID: string;
  PacienteID: string;
  NombrePaciente: string;
  HabitacionID: string;
  NumeroHabitacion: string;
  FechaIngreso: string;
  FechaAlta?: string;
  Diagnostico: string;
  Estado: string;
}

const DarAltaHospitalizacionPage: React.FC = () => {
  const [hospitalizaciones, setHospitalizaciones] = useState<
    HospitalizacionDetallada[]
  >([]);
  const [hospitalizacionID, setHospitalizacionID] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [gastos, setGastos] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hosData = await getHospitalizacionesDetalles();
        setHospitalizaciones(hosData);
      } catch (error) {
        console.error("Error al obtener hospitalizaciones detalladas:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospitalizacionID || !fechaAlta || gastos === 0) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const altaData = {
      hospitalizacionID,
      fechaAlta,
      gastos,
    };

    try {
      await darAltaHospitalizacion(altaData);
      alert("Hospitalización dada de alta con éxito.");
      navigate("/hospitalizaciones");
    } catch (error) {
      console.error("Error al dar alta hospitalización:", error);
      alert("Ocurrió un error al dar alta la hospitalización.");
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
    backgroundColor: "#e67e22",
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
      <h1 style={{ marginBottom: "20px" }}>Dar Alta Hospitalización</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Hospitalización*:</span>
          {hospitalizaciones.length > 0 ? (
            <select
              value={hospitalizacionID}
              onChange={(e) => setHospitalizacionID(e.target.value)}
              required
              style={selectStyle}
            >
              <option value="">-- Seleccionar Hospitalización --</option>
              {hospitalizaciones.map((h) => {
                const fechaIngreso = new Date(h.FechaIngreso).toLocaleString();
                return (
                  <option key={h.HospitalizacionID} value={h.HospitalizacionID}>
                    {h.HospitalizacionID} - Paciente: {h.NombrePaciente}, Hab:{" "}
                    {h.NumeroHabitacion}, Ingreso: {fechaIngreso}
                  </option>
                );
              })}
            </select>
          ) : (
            <p>Cargando hospitalizaciones...</p>
          )}
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Fecha Alta* (YYYY-MM-DD HH:MM:SS):</span>
          <input
            type="datetime-local"
            value={fechaAlta}
            onChange={(e) => setFechaAlta(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: 2024-12-15 10:00:00"
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Gastos*:</span>
          <input
            type="number"
            step="0.01"
            value={gastos}
            onChange={(e) => setGastos(parseFloat(e.target.value))}
            required
            style={inputStyle}
            placeholder="Ej: 1500.00"
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Dar Alta
        </button>
      </form>
    </div>
  );
};

export { DarAltaHospitalizacionPage };
