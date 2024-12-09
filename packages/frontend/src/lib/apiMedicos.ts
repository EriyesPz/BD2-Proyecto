import { cliente } from "./cliente";

interface MedicoData {
  nombre: string;
  apellido: string;
  especialidadID: number;
  interno: boolean;
  honorariosConsulta: number;
  honorariosCirugia?: number;
  email?: string;
}

export const obtenerMedicos = async () => {
  const response = await cliente.get("medicos");
  return response.data;
};

export const obtenerMedico = async (medicoID: string) => {
  const response = await cliente.get(`medico/${medicoID}`);
  return response.data;
};

export const crearMedico = async (medico: MedicoData) => {
  const response = await cliente.post("medico", medico);
  return response.data;
};

export const getEspecialidades = async () => {
  const response = await cliente.get("especialidades");
  return response.data
}