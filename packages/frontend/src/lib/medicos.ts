import { cliente } from "./cliente";

export const getMedicos = async () => {
  try {
    const response = await cliente.get("/medicos");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener médicos: ${error.message}`);
  }
};

export const insertarMedico = async (medico: {
  nombre: string;
  apellido: string;
  especialidadID: number;
  interno: boolean;
  honorariosConsulta: number;
  honorariosCirugia: number;
  direccionID: number;
  telefono: string;
  email: string;
}) => {
  try {
    const response = await cliente.post("/medico", medico);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar médico: ${error.message}`);
  }
};

export const getResumenMedicosConsultas = async () => {
  try {
    const response = await cliente.get("/medicos/resumen-consultas");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener resumen de médicos: ${error.message}`);
  }
};

export const getHonorariosMedicos = async (fechaInicio: string, fechaFin: string) => {
  try {
    const response = await cliente.get("/medicos/honorarios", {
      params: { fechaInicio, fechaFin },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener honorarios de médicos: ${error.message}`);
  }
};
