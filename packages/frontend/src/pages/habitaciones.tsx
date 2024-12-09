import React, { useEffect, useState } from "react";
import { obtenerHabitacionesDisponibles, obtenerHabitaciones } from "../lib";

interface Habitacion {
  HabitacionID: string;
  NumeroHabitacion: string;
  TipoHabitacionID: number;
  Disponible: boolean;
  Caracteristicas: string | null;
}

const HabitacionesPage: React.FC = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [modo, setModo] = useState<"todas" | "disponibles">("disponibles");

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        let data: Habitacion[];
        if (modo === "disponibles") {
          data = await obtenerHabitacionesDisponibles();
        } else {
          data = await obtenerHabitaciones();
        }
        setHabitaciones(data);
      } catch (error) {
        console.error(`Error al obtener habitaciones (${modo}):`, error);
      }
    };

    fetchHabitaciones();
  }, [modo]);

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
    minWidth: "600px",
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

  // Función para eliminar todos los caracteres '<' y '>'
  const quitarAngulos = (text: string | null): string => {
    if (!text) return "N/A";
    const textoLimpio = text.replace(/[<>]/g, '').trim();
    return textoLimpio || "N/A";
  };

  const titulo = modo === "disponibles" ? "Habitaciones Disponibles" : "Todas las Habitaciones";

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>{titulo}</h1>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>Mostrar:</label>
        <select
          value={modo}
          onChange={(e) => setModo(e.target.value as "todas" | "disponibles")}
          style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" }}
        >
          <option value="disponibles">Sólo Disponibles</option>
          <option value="todas">Todas</option>
        </select>
      </div>

      {habitaciones.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Número Habitación</th>
              <th style={thtdStyle}>Tipo</th>
              <th style={thtdStyle}>Disponible</th>
              <th style={thtdStyle}>Características</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((hab) => (
              <tr key={hab.HabitacionID}>
                <td style={thtdStyle}>{hab.HabitacionID}</td>
                <td style={thtdStyle}>{hab.NumeroHabitacion}</td>
                <td style={thtdStyle}>{hab.TipoHabitacionID}</td>
                <td style={thtdStyle}>{hab.Disponible ? "Sí" : "No"}</td>
                <td style={thtdStyle}>{quitarAngulos(hab.Caracteristicas)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay habitaciones {modo === "disponibles" ? "disponibles" : "registradas"}.</p>
      )}
    </div>
  );
};

export { HabitacionesPage };
