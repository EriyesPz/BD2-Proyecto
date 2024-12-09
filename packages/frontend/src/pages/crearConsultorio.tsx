// src/pages/CrearConsultorioPage.tsx
import React, { useState } from "react";
import { crearConsultorio } from "../lib";
import { useNavigate } from "react-router-dom";

const CrearConsultorioPage: React.FC = () => {
  const [tipo, setTipo] = useState("");
  const [numeroConsultorio, setNumeroConsultorio] = useState("");
  const [medicoID, setMedicoID] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipo || !numeroConsultorio || !medicoID || !estado) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const consultorioData = {
      tipo,
      numeroConsultorio,
      medicoID,
      estado,
    };

    try {
      await crearConsultorio(consultorioData);
      alert("Consultorio creado exitosamente.");
      navigate("/consultorios");
    } catch (error) {
      console.error("Error al crear consultorio:", error);
      alert("Ocurrió un error al crear el consultorio.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crear Consultorio</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <label>
          Tipo*:
          <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
        </label>
        <label>
          Número Consultorio*:
          <input type="text" value={numeroConsultorio} onChange={(e) => setNumeroConsultorio(e.target.value)} required />
        </label>
        <label>
          MédicoID*:
          <input type="text" value={medicoID} onChange={(e) => setMedicoID(e.target.value)} required />
        </label>
        <label>
          Estado*:
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="Disponible">Disponible</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </label>

        <button type="submit" style={{ marginTop: "10px" }}>Crear</button>
      </form>
    </div>
  );
};

export { CrearConsultorioPage };
