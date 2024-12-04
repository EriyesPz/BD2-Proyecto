/* eslint-disable @typescript-eslint/no-explicit-any */
import { cliente } from "./cliente";

export const getHonorarios = async (fechaInicio: string, fechaFin: string) => {
  try {
    const response = await cliente.get(
      `/honorarios?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener honorarios médicos: ${error.message}`);
  }
};
