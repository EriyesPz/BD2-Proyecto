/* eslint-disable @typescript-eslint/no-explicit-any */
import { cliente } from "./cliente";

export const getTiposHabitacion = async () => {
  try {
    const response = await cliente.get("/tipos-habitacion");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener tipos de habitación: ${error.message}`);
  }
};

export const insertarTipoHabitacion = async (tipoHabitacion: {
  tipo: string;
  precioPorDia: number;
}) => {
  try {
    const response = await cliente.post("/tipo-habitacion", tipoHabitacion);
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Error al insertar tipo de habitación: ${error.message}`
    );
  }
};

export const getHabitaciones = async () => {
  try {
    const response = await cliente.get("/habitaciones");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener habitaciones: ${error.message}`);
  }
};

export const insertarHabitacion = async (habitacion: {
  numeroHabitacion: number;
  tipoHabitacionID: number;
  disponible: boolean;
  caracteristicas: string;
}) => {
  try {
    const response = await cliente.post("/habitacion", habitacion);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar habitación: ${error.message}`);
  }
};