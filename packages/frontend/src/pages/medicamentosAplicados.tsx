import React, { useEffect, useState } from "react";
import {
  registrarMedicamentoAplicado,
  getMedicamentos,
  obtenerHospitalizaciones,
} from "../lib";
import { useNavigate } from "react-router-dom";

export interface Hospitalizacion {
  HospitalizacionID: string;
  PacienteNombre: string;
  PacienteApellido: string;
  FechaIngreso: string;
}

export interface Medicamento {
  MedicamentoID: string;
  NombreMedicamento: string;
}

const RegistrarMedicamentoAplicadoPage: React.FC = () => {
  const [HospitalizacionID, setHospitalizacionID] = useState("");
  const [MedicamentoID, setMedicamentoID] = useState("");
  const [Cantidad, setCantidad] = useState<number>(0);
  const [FechaAplicacion, setFechaAplicacion] = useState("");
  const [hospitalizaciones, setHospitalizaciones] = useState<Hospitalizacion[]>(
    []
  );
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hosData, medData] = await Promise.all([
          obtenerHospitalizaciones(),
          getMedicamentos(),
        ]);
        setHospitalizaciones(hosData);
        setMedicamentos(medData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        alert(
          "Ocurrió un error al cargar los datos. Por favor, intenta nuevamente."
        );
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !HospitalizacionID ||
      !MedicamentoID ||
      Cantidad <= 0 ||
      !FechaAplicacion
    ) {
      alert(
        "Todos los campos obligatorios deben ser completados correctamente."
      );
      return;
    }

    const data = {
      HospitalizacionID,
      MedicamentoID,
      Cantidad,
      FechaAplicacion: new Date(FechaAplicacion).toISOString(), // Asegura el formato correcto
    };

    try {
      await registrarMedicamentoAplicado(data);
      alert("Medicamento aplicado registrado exitosamente.");
      navigate("/hospitalizaciones");
    } catch (error) {
      console.error("Error al registrar medicamento aplicado:", error);
      alert(
        "Ocurrió un error al registrar el medicamento aplicado. Por favor, verifica los datos e intenta nuevamente."
      );
    }
  };

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const labelSpanStyle: React.CSSProperties = {
    marginBottom: "5px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: "#fff",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 20px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Registrar Medicamento Aplicado</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Hospitalización*:</span>
          <select
            value={HospitalizacionID}
            onChange={(e) => setHospitalizacionID(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">-- Seleccionar Hospitalización --</option>
            {hospitalizaciones.map((hos) => (
              <option key={hos.HospitalizacionID} value={hos.HospitalizacionID}>
                {hos.HospitalizacionID} - {hos.PacienteNombre}{" "}
                {hos.PacienteApellido} (Ingreso:{" "}
                {new Date(hos.FechaIngreso).toLocaleDateString()})
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Medicamento*:</span>
          <select
            value={MedicamentoID}
            onChange={(e) => setMedicamentoID(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">-- Seleccionar Medicamento --</option>
            {medicamentos.map((med) => (
              <option key={med.MedicamentoID} value={med.MedicamentoID}>
                {med.NombreMedicamento}
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Cantidad*:</span>
          <input
            type="number"
            value={Cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
            required
            style={inputStyle}
            placeholder="Ej: 2"
            min="1"
          />
        </label>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>Fecha de Aplicación*:</span>
          <input
            type="datetime-local"
            value={FechaAplicacion}
            onChange={(e) => setFechaAplicacion(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export { RegistrarMedicamentoAplicadoPage };
