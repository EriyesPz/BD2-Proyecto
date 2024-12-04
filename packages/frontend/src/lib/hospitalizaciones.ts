import { cliente } from "./cliente";

export const getHospitalizaciones = async () => {
  try {
    const response = await cliente.get("/hospitalizaciones");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener hospitalizaciones: ${error.message}`);
  }
};

export const registrarHospitalizacion = async (hospitalizacion: {
  pacienteID: number;
  habitacionID: number;
  fechaIngreso: string;
  diagnostico: string;
}) => {
  try {
    const response = await cliente.post("/hospitalizacion", hospitalizacion);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al registrar hospitalización: ${error.message}`);
  }
};

export const darAltaHospitalizacion = async (alta: {
  hospitalizacionID: number;
  fechaAlta: string;
}) => {
  try {
    const response = await cliente.put("/hospitalizaciones/alta", alta);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al dar de alta la hospitalización: ${error.message}`);
  }
};

export const obtenerCostoEstancia = async (hospitalizacionID: number) => {
  try {
    const response = await cliente.get(
      `/hospitalizaciones/${hospitalizacionID}/costo-estancia`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener costo de estancia: ${error.message}`);
  }
};
