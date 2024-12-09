import React, { useState } from "react";
import { registrarExamenMedico } from "../lib";
import { useNavigate } from "react-router-dom";

const RegistrarExamenMedicoPage: React.FC = () => {
  const [HospitalizacionID, setHospitalizacionID] = useState("");
  const [ExamenID, setExamenID] = useState("");
  const [Resultado, setResultado] = useState("");
  const [FechaExamen, setFechaExamen] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!HospitalizacionID || !ExamenID || !Resultado || !FechaExamen) {
      alert("Todos los campos deben ser completados.");
      return;
    }

    const data = {
      HospitalizacionID,
      ExamenID,
      Resultado,
      FechaExamen,
    };

    try {
      await registrarExamenMedico(data);
      alert("Examen médico registrado exitosamente.");
      // Podrías navegar a otra página relevante:
      navigate("/hospitalizaciones");
    } catch (error) {
      console.error("Error al registrar examen médico:", error);
      alert("Ocurrió un error al registrar el examen médico.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registrar Examen Médico</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
        <label>
          HospitalizacionID*:
          <input
            type="text"
            value={HospitalizacionID}
            onChange={(e) => setHospitalizacionID(e.target.value)}
            required
          />
        </label>
        <label>
          ExamenID*:
          <input
            type="text"
            value={ExamenID}
            onChange={(e) => setExamenID(e.target.value)}
            required
          />
        </label>
        <label>
          Resultado*:
          <input
            type="text"
            value={Resultado}
            onChange={(e) => setResultado(e.target.value)}
            required
          />
        </label>
        <label>
          FechaExamen* (YYYY-MM-DD HH:MM:SS):
          <input
            type="text"
            value={FechaExamen}
            onChange={(e) => setFechaExamen(e.target.value)}
            required
          />
        </label>

        <button type="submit" style={{ marginTop: "10px" }}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export { RegistrarExamenMedicoPage };
