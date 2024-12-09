// src/pages/MedicosPage.tsx
import React, { useEffect, useState } from "react";
import { obtenerMedicos, crearMedico, getEspecialidades } from "../lib";
import { useNavigate } from "react-router-dom";

interface Especialidad {
  EspecialidadID: number;
  NombreEspecialidad: string;
}

interface Medico {
  MedicoID?: string;
  Nombre: string;
  Apellido: string;
  EspecialidadID: number;
  Interno: boolean;
  HonorariosConsulta: number;
  HonorariosCirugia?: number;
  Email?: string;
}

const MedicosPage: React.FC = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [selectedEspecialidadID, setSelectedEspecialidadID] = useState<number | null>(null);
  const [interno, setInterno] = useState(false);
  const [honorariosConsulta, setHonorariosConsulta] = useState(0);
  const [honorariosCirugia, setHonorariosCirugia] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medData = await obtenerMedicos();
        setMedicos(medData);

        const espData = await getEspecialidades();
        setEspecialidades(espData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !apellido || selectedEspecialidadID === null || honorariosConsulta === 0) {
      alert("Por favor completa los campos obligatorios: Nombre, Apellido, Especialidad y Honorarios de Consulta.");
      return;
    }

    try {
      await crearMedico({
        nombre,
        apellido,
        especialidadID: selectedEspecialidadID,
        interno,
        honorariosConsulta,
        honorariosCirugia,
        email: email || undefined,
      });

      const data = await obtenerMedicos();
      setMedicos(data);

      // Limpiar el formulario
      setNombre("");
      setApellido("");
      setSelectedEspecialidadID(null);
      setInterno(false);
      setHonorariosConsulta(0);
      setHonorariosCirugia(undefined);
      setEmail("");

      alert("Médico creado exitosamente.");
    } catch (error) {
      console.error("Error al crear médico:", error);
      alert("Ocurrió un error al crear el médico.");
    }
  };

  // Estilos
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "40px",
  };

  const thtdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    fontSize: "14px",
    textAlign: "left",
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

  const buttonStyle: React.CSSProperties = {
    padding: "10px 14px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "14px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  };

  // Crear un mapa de especialidadID a NombreEspecialidad para mostrar en la tabla
  const especialidadMapa = especialidades.reduce((map, esp) => {
    map[esp.EspecialidadID] = esp.NombreEspecialidad;
    return map;
  }, {} as Record<number, string>);

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Médicos</h1>

      {medicos.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Nombre</th>
              <th style={thtdStyle}>Apellido</th>
              <th style={thtdStyle}>Especialidad</th>
              <th style={thtdStyle}>Interno</th>
              <th style={thtdStyle}>H. Consulta</th>
              <th style={thtdStyle}>H. Cirugía</th>
              <th style={thtdStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((med) => (
              <tr key={med.MedicoID}>
                <td style={thtdStyle}>{med.MedicoID}</td>
                <td style={thtdStyle}>{med.Nombre}</td>
                <td style={thtdStyle}>{med.Apellido}</td>
                <td style={thtdStyle}>
                  {especialidadMapa[med.EspecialidadID]
                    ? especialidadMapa[med.EspecialidadID]
                    : `ID: ${med.EspecialidadID}`}
                </td>
                <td style={thtdStyle}>{med.Interno ? "Sí" : "No"}</td>
                <td style={thtdStyle}>{med.HonorariosConsulta}</td>
                <td style={thtdStyle}>{med.HonorariosCirugia ?? "N/A"}</td>
                <td style={thtdStyle}>{med.Email ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay médicos registrados.</p>
      )}

      <h2 style={{ marginBottom: "20px" }}>Crear Médico</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Nombre*:</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: Carlos"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Apellido*:</span>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: López"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Especialidad*:</span>
          {especialidades.length > 0 ? (
            <select
              value={selectedEspecialidadID ?? ""}
              onChange={(e) => setSelectedEspecialidadID(e.target.value ? parseInt(e.target.value, 10) : null)}
              style={selectStyle}
              required
            >
              <option value="">-- Selecciona Especialidad --</option>
              {especialidades.map((esp) => (
                <option key={esp.EspecialidadID} value={esp.EspecialidadID}>
                  {esp.NombreEspecialidad}
                </option>
              ))}
            </select>
          ) : (
            <p>Cargando especialidades...</p>
          )}
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>¿Es interno?</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={interno}
              onChange={(e) => setInterno(e.target.checked)}
            />
            <span style={{ fontSize: "14px" }}>Marcar si el médico es interno</span>
          </div>
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Honorarios de Consulta*:</span>
          <input
            type="number"
            step="0.01"
            value={honorariosConsulta}
            onChange={(e) => setHonorariosConsulta(parseFloat(e.target.value))}
            required
            style={inputStyle}
            placeholder="Ej: 500.00"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Honorarios de Cirugía:</span>
          <input
            type="number"
            step="0.01"
            value={honorariosCirugia !== undefined ? honorariosCirugia : ""}
            onChange={(e) => setHonorariosCirugia(e.target.value ? parseFloat(e.target.value) : undefined)}
            style={inputStyle}
            placeholder="Opcional"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="Opcional"
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Crear Médico
        </button>
      </form>
    </div>
  );
};

export { MedicosPage };
