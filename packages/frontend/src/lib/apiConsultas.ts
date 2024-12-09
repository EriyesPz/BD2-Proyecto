import { cliente } from "./cliente";

interface VisitaMedicaData {
  ConsultaID: string;
  MedicoID: string;
  PacienteID: string;
  FechaConsulta: string;
  MotivoConsulta: string;
  Diagnostico: string;
  Prescripcion?: string;
}

interface ExamenMedicoData {
  HospitalizacionID: string;
  ExamenID: string;
  Resultado: string;
  FechaExamen: string;
}

export const registrarVisitaMedica = async (data: VisitaMedicaData) => {
  const response = await cliente.post("registrar-visita", data);
  return response.data;
};

export const registrarExamenMedico = async (data: ExamenMedicoData) => {
  const response = await cliente.post("consultas/examen", data);
  return response.data;
};

export const getConsultas = async () => {
  const response = await cliente.get("consultas");
  return response.data;
};
