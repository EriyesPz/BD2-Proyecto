import React, { useEffect, useState } from "react";
import { obtenerHospitalizacion } from "../lib";
import { useParams } from "react-router-dom";

interface Hospitalizacion {
  HospitalizacionID: string;
  PacienteID: string;
  HabitacionID: string;
  FechaIngreso: string;
  FechaAlta?: string;
  Diagnostico: string;
  Estado: string;
}

const HospitalizacionDetailPage: React.FC = () => {
  const { hospitalizacionID } = useParams<{ hospitalizacionID: string }>();
  const [hospitalizacion, setHospitalizacion] =
    useState<Hospitalizacion | null>(null);

  useEffect(() => {
    const fetchHospitalizacion = async () => {
      if (!hospitalizacionID) return;
      try {
        const data = await obtenerHospitalizacion(hospitalizacionID);
        setHospitalizacion(data);
      } catch (error) {
        console.error("Error al obtener hospitalización:", error);
      }
    };
    fetchHospitalizacion();
  }, [hospitalizacionID]);

  if (!hospitalizacion) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          color: "#333",
        }}
      >
        Cargando información de la hospitalización...
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
    transition: "transform 0.2s",
    marginTop: "20px",
  };

  const cardHoverStyle: React.CSSProperties = {
    transform: "scale(1.01)",
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
      <h1 style={{ marginBottom: "20px" }}>Detalle de Hospitalización</h1>
      <div
        style={cardStyle}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, cardHoverStyle)
        }
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div style={sectionTitleStyle}>Información General</div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>ID de Hospitalización:</span>
          <span style={detailValueStyle}>
            {hospitalizacion.HospitalizacionID}
          </span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Paciente:</span>
          <span style={detailValueStyle}>{hospitalizacion.PacienteID}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Habitación:</span>
          <span style={detailValueStyle}>{hospitalizacion.HabitacionID}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Fecha de Ingreso:</span>
          <span style={detailValueStyle}>{hospitalizacion.FechaIngreso}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Fecha de Alta:</span>
          <span style={detailValueStyle}>
            {hospitalizacion.FechaAlta || "N/A"}
          </span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Diagnóstico:</span>
          <span style={detailValueStyle}>{hospitalizacion.Diagnostico}</span>
        </div>

        <div style={detailRowStyle}>
          <span style={detailLabelStyle}>Estado:</span>
          <span style={detailValueStyle}>{hospitalizacion.Estado}</span>
        </div>
      </div>
    </div>
  );
};

export { HospitalizacionDetailPage };
