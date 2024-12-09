import React, { useEffect, useState } from "react";
import { obtenerConsultorio } from "../lib";
import { useParams } from "react-router-dom";

interface Consultorio {
  ConsultorioID?: string;
  Tipo: string;
  NumeroConsultorio: string;
  MedicoID: string;
  Estado: string;
}

const ConsultorioDetailPage: React.FC = () => {
  const { consultorioID } = useParams<{ consultorioID: string }>();
  const [consultorio, setConsultorio] = useState<Consultorio | null>(null);

  useEffect(() => {
    const fetchConsultorio = async () => {
      if (!consultorioID) return;
      try {
        const data = await obtenerConsultorio(consultorioID);
        setConsultorio(data);
      } catch (error) {
        console.error("Error al obtener consultorio:", error);
      }
    };
    fetchConsultorio();
  }, [consultorioID]);

  if (!consultorio) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>
        Cargando consultorio...
      </div>
    );
  }

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    marginTop: "20px",
    transition: "transform 0.2s",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "bold",
    borderBottom: "1px solid #ccc",
    paddingBottom: "8px",
    marginBottom: "16px",
    color: "#2c3e50",
    textTransform: "uppercase",
  };

  const detailRowStyle: React.CSSProperties = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const detailLabelStyle: React.CSSProperties = {
    fontWeight: "bold",
    marginBottom: "4px",
    fontSize: "14px",
    color: "#555",
  };

  const detailValueStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Detalle del Consultorio</h1>
      <div
        style={cardStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform: "scale(1.01)" })}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div style={sectionTitleStyle}>Información del Consultorio</div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>ID:</span>
          <span style={detailValueStyle}>{consultorio.ConsultorioID || "N/A"}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Tipo:</span>
          <span style={detailValueStyle}>{consultorio.Tipo}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Número Consultorio:</span>
          <span style={detailValueStyle}>{consultorio.NumeroConsultorio}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>MédicoID:</span>
          <span style={detailValueStyle}>{consultorio.MedicoID}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Estado:</span>
          <span style={detailValueStyle}>{consultorio.Estado}</span>
        </div>
      </div>
    </div>
  );
};

export { ConsultorioDetailPage };
