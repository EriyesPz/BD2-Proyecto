import { cliente } from "./cliente";

export const getSegurosMedicos = async () => {
  try {
    const response = await cliente.get("/seguros-medicos");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener seguros médicos: ${error.message}`);
  }
};

export const insertarSeguroMedico = async (seguro: {
  nombreAseguradora: string;
  cobertura: string;
  telefono: string;
  email: string;
}) => {
  try {
    const response = await cliente.post("/seguro-medico", seguro);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar seguro médico: ${error.message}`);
  }
};
