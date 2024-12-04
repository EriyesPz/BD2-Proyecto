import { cliente } from "./cliente";

export const getResultadosLaboratorio = async () => {
  try {
    const response = await cliente.get("/resultados-laboratorio");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener resultados de laboratorio: ${error.message}`);
  }
};

export const insertarResultadoLaboratorio = async (resultado: {
  examenID: number;
  pacienteID: number;
  fechaExamen: string;
  resultados: string;
  observaciones: string;
}) => {
  try {
    const response = await cliente.post("/resultado-laboratorio", resultado);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar resultado de laboratorio: ${error.message}`);
  }
};

export const getResultadosLaboratorioPorID = async (resultadoID: number) => {
  try {
    const response = await cliente.get(`/resultados-laboratorio/${resultadoID}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener resultados de laboratorio por ID: ${error.message}`);
  }
};
