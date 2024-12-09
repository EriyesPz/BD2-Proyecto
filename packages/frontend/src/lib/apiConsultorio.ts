import { cliente } from "./cliente";

interface ConsultorioData {
  tipo: string;
  numeroConsultorio: string;
  medicoID: string;
  estado: string;
}

export const obtenerConsultorios = async () => {
  const response = await cliente.get("consultorios");
  return response.data;
};

export const obtenerConsultorio = async (consultorioID: string) => {
  const response = await cliente.get(`consultorio/${consultorioID}`);
  return response.data;
};

export const crearConsultorio = async (data: ConsultorioData) => {
  const response = await cliente.post("consultorio", data);
  return response.data;
};
