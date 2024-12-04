/* eslint-disable @typescript-eslint/no-explicit-any */
import { cliente } from "./cliente";

export const getMedicamentos = async () => {
  try {
    const response = await cliente.get("/medicamentos");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener medicamentos: ${error.message}`);
  }
};

export const insertarMedicamento = async (medicamento: {
  nombreMedicamento: string;
  descripcion: string;
  precio: number;
  stock: number;
  proveedorID: number;
}) => {
  try {
    const response = await cliente.post("/medicamento", medicamento);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al insertar medicamento: ${error.message}`);
  }
};

export const getStockMedicamentos = async () => {
  try {
    const response = await cliente.get("/medicamentos/stock");
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al obtener stock de medicamentos: ${error.message}`);
  }
};

export const verificarStockMedicamento = async (medicamentoID: number) => {
  try {
    const response = await cliente.get(`/medicamentos/${medicamentoID}/verificar-stock`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error al verificar stock de medicamento: ${error.message}`);
  }
};
