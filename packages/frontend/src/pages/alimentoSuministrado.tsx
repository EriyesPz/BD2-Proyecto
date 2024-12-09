import React, { useState } from "react";
import { registrarAlimentoSuministrado } from "../lib";
import { useNavigate } from "react-router-dom";

const RegistrarAlimentoSuministradoPage: React.FC = () => {
  const [HospitalizacionID, setHospitalizacionID] = useState("");
  const [AlimentoID, setAlimentoID] = useState("");
  const [Cantidad, setCantidad] = useState<number>(0);
  const [FechaServicio, setFechaServicio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!HospitalizacionID || !AlimentoID || Cantidad === 0 || !FechaServicio) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await registrarAlimentoSuministrado({ HospitalizacionID, AlimentoID, Cantidad, FechaServicio });
      alert("Alimento suministrado registrado exitosamente.");
      // Podrías navegar a otra página, por ejemplo a la lista de hospitalizaciones
      navigate("/hospitalizaciones");
    } catch (error) {
      console.error("Error al registrar alimento suministrado:", error);
      alert("Ocurrió un error al registrar el alimento suministrado.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registrar Alimento Suministrado</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <label>
          HospitalizacionID*:
          <input type="text" value={HospitalizacionID} onChange={(e) => setHospitalizacionID(e.target.value)} required />
        </label>
        <label>
          AlimentoID*:
          <input type="text" value={AlimentoID} onChange={(e) => setAlimentoID(e.target.value)} required />
        </label>
        <label>
          Cantidad*:
          <input type="number" value={Cantidad} onChange={(e) => setCantidad(parseInt(e.target.value, 10))} required />
        </label>
        <label>
          FechaServicio* (YYYY-MM-DD HH:MM:SS):
          <input type="text" value={FechaServicio} onChange={(e) => setFechaServicio(e.target.value)} required />
        </label>

        <button type="submit" style={{ marginTop: "10px" }}>Registrar</button>
      </form>
    </div>
  );
};

export { RegistrarAlimentoSuministradoPage };
