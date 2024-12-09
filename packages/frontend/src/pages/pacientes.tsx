import React, { useEffect, useState } from "react";
import { obtenerPacientes, crearPaciente } from "../lib";

interface Paciente {
  PacienteID?: string;
  Nombre: string;
  Apellido: string;
  FechaNacimiento: string;
  Genero: "M" | "F" | "O";
  Telefono?: string;
  Email?: string;
  Direccion?: string;
  NumeroSeguroSocial: string;
  FechaRegistro?: string;
}

const PacientesPage: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [genero, setGenero] = useState<"M" | "F" | "O">("M");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [seguroSocial, setSeguroSocial] = useState("");

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await obtenerPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !apellido || !nacimiento || !genero || !seguroSocial) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      await crearPaciente({
        nombre,
        apellido,
        nacimiento,
        genero,
        telefono: telefono || undefined,
        email: email || undefined,
        direccion: direccion || undefined,
        seguroSocial,
      });

      const data = await obtenerPacientes();
      setPacientes(data);

      // Limpiar formulario
      setNombre("");
      setApellido("");
      setNacimiento("");
      setGenero("M");
      setTelefono("");
      setEmail("");
      setDireccion("");
      setSeguroSocial("");

      alert("Paciente creado exitosamente.");
    } catch (error) {
      console.error("Error al crear paciente:", error);
      alert("Ocurrió un error al crear el paciente.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    transition: "border-color 0.3s",
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
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 14px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "14px",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Pacientes</h1>

      {pacientes.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Nombre</th>
              <th style={thtdStyle}>Apellido</th>
              <th style={thtdStyle}>Género</th>
              <th style={thtdStyle}>Fecha Nac.</th>
              <th style={thtdStyle}>Teléfono</th>
              <th style={thtdStyle}>Email</th>
              <th style={thtdStyle}>Dirección</th>
              <th style={thtdStyle}>NSS</th>
              <th style={thtdStyle}>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((pac) => (
              <tr key={pac.PacienteID}>
                <td style={thtdStyle}>{pac.PacienteID}</td>
                <td style={thtdStyle}>{pac.Nombre}</td>
                <td style={thtdStyle}>{pac.Apellido}</td>
                <td style={thtdStyle}>{pac.Genero}</td>
                <td style={thtdStyle}>{pac.FechaNacimiento}</td>
                <td style={thtdStyle}>{pac.Telefono || "N/A"}</td>
                <td style={thtdStyle}>{pac.Email || "N/A"}</td>
                <td style={thtdStyle}>{pac.Direccion || "N/A"}</td>
                <td style={thtdStyle}>{pac.NumeroSeguroSocial}</td>
                <td style={thtdStyle}>
                  {pac.FechaRegistro
                    ? new Date(pac.FechaRegistro).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginBottom: "40px" }}>No hay pacientes registrados.</p>
      )}

      <h2 style={{ marginBottom: "20px" }}>Crear Paciente</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Nombre*:</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: Juan"
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
            placeholder="Ej: Pérez"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Fecha de Nacimiento* (YYYY-MM-DD):</span>
          <input
            type="date"
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Género*:</span>
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value as "M" | "F" | "O")}
            style={inputStyle}
          >
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="O">O</option>
          </select>
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Teléfono:</span>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
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
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Dirección:</span>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            style={inputStyle}
            placeholder="Opcional"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Número de Seguro Social*:</span>
          <input
            type="text"
            value={seguroSocial}
            onChange={(e) => setSeguroSocial(e.target.value)}
            required
            style={inputStyle}
            placeholder="Ej: SSS123456"
          />
        </label>

        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: "#27ae60",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#2ecc71")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ae60")
          }
        >
          Crear Paciente
        </button>
      </form>
    </div>
  );
};

export { PacientesPage };
