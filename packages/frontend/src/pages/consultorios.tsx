import React, { useEffect, useState } from "react";
import { obtenerConsultorios } from "../lib";
import { Link } from "react-router-dom";

interface Consultorio {
  ConsultorioID?: string;
  Tipo: string;
  NumeroConsultorio: string;
  MedicoID: string;
  Estado: string;
}

const ConsultoriosPage: React.FC = () => {
  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);

  useEffect(() => {
    const fetchConsultorios = async () => {
      try {
        const data = await obtenerConsultorios();
        setConsultorios(data);
      } catch (error) {
        console.error("Error al obtener consultorios:", error);
      }
    };

    fetchConsultorios();
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

  const buttonStyle: React.CSSProperties = {
    padding: "8px 12px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "14px",
    display: "inline-block",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Consultorios</h1>

      {consultorios.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr style={headerStyle}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Tipo</th>
              <th style={thtdStyle}>Número</th>
              <th style={thtdStyle}>Médico</th>
              <th style={thtdStyle}>Estado</th>
              <th style={thtdStyle}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {consultorios.map((c) => (
              <tr key={c.ConsultorioID}>
                <td style={thtdStyle}>{c.ConsultorioID || "N/A"}</td>
                <td style={thtdStyle}>{c.Tipo}</td>
                <td style={thtdStyle}>{c.NumeroConsultorio}</td>
                <td style={thtdStyle}>{c.MedicoID}</td>
                <td style={thtdStyle}>{c.Estado}</td>
                <td style={thtdStyle}>
                  {c.ConsultorioID ? (
                    <Link
                      to={`/consultorio/${c.ConsultorioID}`}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#27ae60",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Ver Detalle
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay consultorios registrados.</p>
      )}

      <Link to="/consultorio/crear" style={buttonStyle}>
        Crear Consultorio
      </Link>
    </div>
  );
};

export { ConsultoriosPage };
